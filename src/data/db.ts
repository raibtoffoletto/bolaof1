import { join } from 'node:path';
import PengORM from 'peng-orm';

const pathPrefix =
  process.env.NODE_ENV !== 'production' ? '.' : process.env['DB_PATH'] || '.';

const dbPath = join(pathPrefix, 'bot-data.db');

const guilds = `
  CREATE TABLE IF NOT EXISTS guilds (
    id TEXT NOT NULL,
    name TEXT NOT NULL
  );
`;

const migrations: string[][] = [[guilds]];

const dbContext = new PengORM(dbPath, migrations);

export default dbContext;
