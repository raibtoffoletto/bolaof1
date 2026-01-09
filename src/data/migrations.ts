const drivers = `
  CREATE TABLE IF NOT EXISTS drivers (
    id INTEGER NOT NULL,
    name TEXT NOT NULL,
    team TEXT NOT NULL
  );
`;

const grandsprix = `
  CREATE TABLE IF NOT EXISTS grandsprix (
    id TEXT NOT NULL,
    name TEXT NOT NULL,
    country TEXT NOT NULL,
    circuit TEXT NOT NULL,
    date INTEGER NOT NULL
  );
`;

const users = `
  CREATE TABLE IF NOT EXISTS users (
    id TEXT NOT NULL,
    username TEXT NOT NULL,
    guildId TEXT NOT NULL
  );
`;

const migrations: string[][] = [[drivers, grandsprix, users]];

export default migrations;
