import { join } from 'node:path';
import PengORM from 'peng-orm';
import migrations from './migrations';

const pathPrefix =
  process.env.NODE_ENV !== 'production' ? '.' : process.env['DB_PATH'] || '.';

const dbPath = join(pathPrefix, 'bot-data.db');

const dbContext = new PengORM(dbPath, migrations);

export default dbContext;
