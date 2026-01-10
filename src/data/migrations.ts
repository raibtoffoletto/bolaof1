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
    date INTEGER NOT NULL,
    polePosition INTEGER,
    firstPlace INTEGER,
    secondPlace INTEGER,
    thirdPlace INTEGER
  );
`;

const instances = `
  CREATE TABLE IF NOT EXISTS instances (
    guildId TEXT NOT NULL,
    name TEXT NOT NULL,
    channelId TEXT NOT NULL
  );
`;

const users = `
  CREATE TABLE IF NOT EXISTS users (
    id TEXT NOT NULL,
    username TEXT NOT NULL,
    guildId TEXT NOT NULL
  );
`;

const predictions = `
  CREATE TABLE IF NOT EXISTS predictions (
    grandprixId TEXT NOT NULL,
    userId TEXT NOT NULL,
    guildId TEXT NOT NULL,
    polePosition INTEGER NOT NULL,
    firstPlace INTEGER NOT NULL,
    secondPlace INTEGER NOT NULL,
    thirdPlace INTEGER NOT NULL
  );
`;

const userPoints = `
  CREATE TABLE IF NOT EXISTS userPoints (
    userId TEXT NOT NULL,
    guildId TEXT NOT NULL,
    points INTEGER NOT NULL
  );
`;

const migrations: string[][] = [
  [drivers, grandsprix, instances, users, predictions, userPoints],
];

export default migrations;
