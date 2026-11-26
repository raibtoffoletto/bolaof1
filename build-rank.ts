/**
 * build-rank.ts: normalized rankings for the Bolão F1 pool.
 *
 * Usage:
 *   npx tsx build-rank.ts [file.json] [--verbose]
 *
 *   file.json  Array of `{ grandprixId, points, username }`, one record per play
 *              (defaults to ./runners.json). A Sprint (`grandprixId` with "S")
 *              counts as one play, exactly like a GP.
 *   --verbose  Also lists each user's dropped plays (`gpId:points`) in removal order.
 *
 * Why normalize: users played different numbers of events, so raw totals favour
 * whoever played the most. Each table answers "who is best?" in a different way.
 * All of them break ties by raw total, higher first.
 *
 * Baseline: the smallest number of plays any user has. Methods 1 and 2 trim every
 * user down to the baseline before summing.
 *
 * 1) Alternate lowest/highest
 *    Sort a user's plays by points, then drop the lowest, the highest, the lowest...
 *    until the baseline is reached. Sum what's left.
 *    Caveat: almost everyone has several 0-point plays, so the "lowest" drops are
 *    usually 0s and change nothing, while every "highest" drop removes a best
 *    result. The more extra plays a user has, the more they lose, so this ends up
 *    favouring the users with the fewest plays.
 *
 * 2) Drop only the lowest
 *    Drop the user's lowest plays until the baseline is reached. Sum what's left.
 *    Rewards consistency: only your best `baseline` results count.
 *    Caveat: since the dropped plays are mostly 0s, this ends up close to the raw
 *    ranking, which rewards playing more.
 *
 * 3) Average points per play
 *    Nothing is dropped: raw total / number of plays. Sits between the other two
 *    and is probably the fairest when the number of plays varies a lot.
 *
 * 4) Average of scoring plays (zeros dropped)
 *    Ignores the baseline: drop every 0-point play, then raw total / number of
 *    plays that scored. Answers "when you score, how much do you score?".
 *    Caveat: a 0 costs nothing here, so it doesn't reward consistency. A user
 *    with a few big hits can beat someone who scores every race. A user with no
 *    scoring plays gets 0.
 *
 * The baseline depends on who is in the file. Removing the user with the fewest
 * plays raises it, so methods 1 and 2 drop fewer plays and move closer to raw.
 */
import { readFile } from 'node:fs/promises';

/** One prediction result: a user's points for one GP or Sprint. */
type Play = { grandprixId: string; points: number; username: string };

/** A ranking table row. `score` is whatever the method ranks by. */
type Row = {
  username: string;
  plays: number;
  removed: Play[];
  rawTotal: number;
  score: number;
};

/**
 * Trims `sorted` (a user's plays sorted ascending by points) in place, leaving at
 * most `baseline` plays. Returns the removed plays in removal order.
 */
type Trim = (sorted: Play[], baseline: number) => Play[];

const sum = (plays: Play[]) => plays.reduce((acc, p) => acc + p.points, 0);

const args = process.argv.slice(2);
const verbose = args.includes('--verbose');
const file = args.find((a) => !a.startsWith('--')) ?? './runners.json';

const records: Play[] = JSON.parse(await readFile(file, 'utf8'));

// Group plays by user.
const byUser = new Map<string, Play[]>();
for (const record of records) {
  const plays = byUser.get(record.username) ?? [];
  plays.push(record);
  byUser.set(record.username, plays);
}

// Fewest plays of any user: everyone is trimmed down to this in methods 1 and 2.
const baseline = Math.min(...[...byUser.values()].map((plays) => plays.length));

/** Method 1: drop lowest, highest, lowest... (`shift` = lowest, `pop` = highest). */
const alternate: Trim = (sorted, baseline) => {
  const removed: Play[] = [];
  let dropLowest = true;
  while (sorted.length > baseline) {
    removed.push((dropLowest ? sorted.shift() : sorted.pop())!);
    dropLowest = !dropLowest;
  }
  return removed;
};

/** Method 2: drop the lowest plays (the head of the ascending list). */
const lowestOnly: Trim = (sorted, baseline) =>
  sorted.splice(0, Math.max(0, sorted.length - baseline));

/** Method 3: keep everything. */
const noTrim: Trim = () => [];

/** Method 4: drop every 0-point play (the head of the ascending list). */
const zeros: Trim = (sorted) => sorted.splice(0, sorted.filter((p) => !p.points).length);

/**
 * Builds a ranking: trims each user's plays with `trim`, scores them with `score`
 * (it gets the kept plays and all of the user's plays), then sorts by score desc,
 * with ties broken by raw total desc.
 */
const rank = (trim: Trim, score: (kept: Play[], plays: Play[]) => number): Row[] =>
  [...byUser.entries()]
    .map(([username, plays]) => {
      const kept = [...plays].sort((a, b) => a.points - b.points);
      const removed = trim(kept, baseline);
      return {
        username,
        plays: plays.length,
        removed,
        rawTotal: sum(plays),
        score: score(kept, plays),
      };
    })
    .sort((a, b) => b.score - a.score || b.rawTotal - a.rawTotal);

/** Prints one ranking table, plus the dropped plays when `--verbose` is on. */
const print = (title: string, rows: Row[], scoreLabel: string, decimals = 0) => {
  console.log(`\n${title}`);
  console.table(
    rows.map((row, i) => ({
      pos: i + 1,
      user: row.username,
      plays: row.plays,
      removed: row.removed.length,
      raw: row.rawTotal,
      [scoreLabel]: Number(row.score.toFixed(decimals)),
    })),
  );

  if (verbose && rows.some((row) => row.removed.length)) {
    console.log('Removed plays (in removal order):');
    for (const row of rows) {
      const list = row.removed.map((p) => `${p.grandprixId}:${p.points}`).join(', ');
      console.log(`  ${row.username}: ${list || '-'}`);
    }
  }
};

console.log(`Baseline: ${baseline} plays`);

print(
  '1) Trim to baseline, alternating lowest/highest',
  rank(alternate, (kept) => sum(kept)),
  'normalized',
);
print(
  '2) Trim to baseline, dropping only the lowest',
  rank(lowestOnly, (kept) => sum(kept)),
  'normalized',
);
print(
  '3) Average points per play (nothing dropped)',
  rank(noTrim, (_, plays) => sum(plays) / plays.length),
  'average',
  2,
);
print(
  '4) Average of scoring plays (all zeros dropped)',
  rank(zeros, (kept) => (kept.length ? sum(kept) / kept.length : 0)),
  'average',
  2,
);
