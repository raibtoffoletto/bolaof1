import dbContext from './db';

export function list() {
  return dbContext.query<Guild>('SELECT * FROM guilds');
}

export function create(id: string, name: string) {
  const insertSql = 'INSERT INTO guilds (id, name) VALUES (?, ?);';

  dbContext.exec(insertSql, [id, name]);
}
