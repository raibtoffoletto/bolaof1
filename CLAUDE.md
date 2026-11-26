# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

"Bolão F1" — a Discord bot (discord.js v14) for running an F1 2026 season prediction pool across servers. Users predict pole + podium (P1–P3) for each Grand Prix and Sprint; points are awarded once an admin posts the results. **All user-facing text is Brazilian Portuguese**, and so are the slash command names and handler file names (`palpitar`, `votacao`, `classificacao`, …). Keep new user-facing strings in Portuguese.

## Commands

Yarn, Node `>=22 <25` (Docker image uses Node 24).

```bash
yarn install
cp .env.example .env   # DISCORD_BOT_TOKEN, DISCORD_CLIENT_ID, DB_PATH, MONITOR_INTERVAL (hours)
yarn dev               # tsx watch on src/main.ts
yarn lint              # tsc --noEmit && eslint ./src
yarn format            # prettier -w .
yarn build             # lint + format + tsc + tsup → dist/main.js (single ESM bundle)
yarn start             # node dist/main.js
docker build -t f1bot .
```

There is no test suite. Validate changes with `yarn lint`. Prettier here uses `printWidth: 90`, which differs from the user's global default of 100. The ESLint prettier rule repeats these options inline, so if you change `.prettierrc.json`, change `eslint.config.mjs` too.

## Architecture

`src/main.ts` seeds the DB and then starts three things that share one discord.js `Client`:

1. **Bot** (`bot.ts`): gateway event wiring.
   - `onClientReady` / `onGuildCreate` call `verifyGuildData` (it upserts an `instances` row and gets or creates the `#bolao-f1-2026` text channel) and `registerCommands`. Slash commands are registered **per guild**, not globally. On ready, the bot also deletes `instances` rows for guilds it is no longer in.
   - `onInteractionCreate` is the single dispatcher. Buttons whose `customId` starts with `BOT_EVENT_PREFIX` go to `handleButton`. Modal submits with `SUBMIT_VOTE_EVENT_ID` go to `handlers/palpitar`. Chat commands go to `handleChatInput`.
2. **Monitor** (`monitor.ts`): a `setInterval` that runs every `MONITOR_INTERVAL` **minutes** (default 5). It starts on `clientReady` and does its first run right away. The actual work is in `lib/syncVotingWindows.ts`, which `onGuildCreate` also calls for a server the bot just joined. For each GP whose voting window has opened (`GPs.find`) and each instance, it makes the channel match the window state, idempotently:
   - no card yet → post it (`notify`), unless the window has already closed, in which case it is skipped on purpose;
   - `REMINDER_HOURS` before closing → post a reminder once (`remind`, which sets `notifications.reminded`);
   - after closing → edit the card to its locked state (`lock`).

   Before syncing a server, it checks that the bot channel still exists. If the channel was deleted, it calls `verifyGuildData` to recreate it and switch the instance to the new channel. Each GP × channel pair has its own try/catch. If a card has been deleted, `lock` marks it locked instead of throwing. The posted message IDs and these flags are stored in `notifications`.

3. **Admin HTTP server** (`server.ts` + `admin/`): Polka on port 3000, with server-rendered HTML pages built by `getPage`. It has **no auth**, so it must not be exposed publicly. `POST /gps` with `{id, polePosition, firstPlace, secondPlace, thirdPlace}` records results, recomputes points for every prediction on that GP, and calls `lock` on each channel's message so the results show. `GET/POST /admin` is a raw SQL console (`QUERY` → `dbContext.query`, `COMMAND` → `dbContext.exec`). Handlers are typed with express's `RequestHandler`, but they run on Polka and read the JSON body by hand from the request stream.

### Domain rules (spread across several files)

- **Sprints** are GPs whose `id` contains `S` (e.g. `'2S'` vs `'2'`). Use `isSprint(gpId)` from `lib/manageGpMessages.ts`. It controls both the scoring table (`POINTS.S*`) and the voting cutoff.
- **Voting window**: the hours are set in `constants.ts` (`VOTING_OPENS_HOURS` = 48, `VOTING_CLOSES_HOURS` = 24 for a GP and 19.5 for a Sprint, `REMINDER_HOURS`). `getVotingWindow` / `isTooLate` in `lib/manageGpMessages.ts` derive the open and close times from them, and both the vote button and the modal submit check `isTooLate`. `grandsprix.find`, `HELP_TEXT` and the card's countdown (`<t:…:R>`) all read the same constants, so change the rules only there.
- Driver IDs are car numbers. Predictions and users are scoped per `guildId`; the same Discord user has separate standings in each server.
- `customId` routing: button and modal IDs are built from `BOT_EVENT_PREFIX` plus a suffix (often a GP id) in `lib/constants.ts`. Handlers strip the prefix to recover the GP id.
- Adding a slash command means updating the `Command` union in `types.d.ts`, plus `COMMANDS` / `COMMAND_DESCRIPTIONS` / (optionally) `COMMAND_OPTIONS` in `constants.ts` and the switch in `handleChatInput.ts`.

### Data layer

- SQLite through `peng-orm` (`data/db.ts`). The DB file is `./bot-data.db`, except when `NODE_ENV=production`, where it is `$DB_PATH/bot-data.db`.
- `data/migrations.ts` exports `string[][]`. Each inner array is one migration step, written in hand-written SQL. Append a new inner array; don't edit existing steps. Tables have no primary keys or foreign keys, and rows are matched on composite columns.
- `data/repos/*.ts` each default-export an object of query functions (`get`, `list`, `create`, `update`, …) with raw parameterized SQL.
- `data/seed.ts` holds the season's drivers and calendar (dates are epoch ms) and inserts them **only when the table is empty**. Editing seed data does not change an existing DB; use the admin SQL console or a migration for that.
- Shared domain types (`Driver`, `GrandPrix`, `Prediction`, `GPNotification`, …) are ambient globals in `src/types.d.ts`, with no import needed.

## Conventions in this repo

These differ from the user's global React/TS conventions, so follow the existing code here: file names are **camelCase** (`manageGpMessages.ts`, `handleChatInput.ts`), there are no path aliases (relative imports only), and one default-exported function per file. Log lines are prefixed with the module name in brackets, e.g. `[monitor]`, `[onClientReady]:`. When a command fails, the bot replies with a random quote from `getQuote` as its user-facing error message.
