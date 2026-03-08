# F1 Betting Bot

A Discord bot for servers to play a betting pool for the 2026 F1 season.

## Stack

- **Runtime**: Node.js (>=22.0.0 <25.0.0)
- **Language**: TypeScript
- **Bot Framework**: Discord.js v14
- **Database ORM**: peng-orm
- **Web Server**: Polka
- **Build Tool**: tsup
- **Development**: tsx (for hot reloading), ESLint, Prettier

## Architecture

The bot is structured as follows:

- `src/bot.ts`: Main bot client setup
- `src/main.ts`: Entry point
- `src/server.ts`: Web server for admin panel
- `src/monitor.ts`: Monitoring utilities
- `events/`: Discord event handlers (ready, interactions, etc.)
- `admin/`: Admin panel routes and utilities
- `data/`: Database layer with migrations, seed, and repositories
- `lib/`: Shared utilities and constants

The bot uses a SQLite database (via peng-orm) for storing users, predictions, races, and notifications.

## Dependencies

Install dependencies using Yarn:

```bash
yarn install
```

## Running in Development Mode

First, copy the environment variables file:

```bash
cp .env.example .env
```

Then, configure the `.env` file with your bot token and other required settings.

To run the bot in development mode with hot reloading:

```bash
yarn dev
```

This will start the bot using `tsx watch` which automatically restarts on file changes.

## Building a Container

Build the Docker image:

```bash
docker build -t f1bot .
```

Run the container:

```bash
docker run f1bot
```

The Dockerfile uses a multi-stage build: first stage builds the TypeScript code, second stage runs the production build.

## Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Setup

- Ensure you have Node.js >=22.0.0
- Run `yarn install` to install dependencies
- Use `yarn lint` to check code style
- Use `yarn format` to format code
- Run `yarn build` before committing

### Code Style

- Use TypeScript for all new code
- Follow the existing ESLint and Prettier configuration
- Write meaningful commit messages
- Test your changes thoroughly

For any questions or issues, please open an issue on GitHub.
