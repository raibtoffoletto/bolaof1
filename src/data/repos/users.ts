import dbContext from '../db';

function get(id: string, guildId: string) {
  return dbContext.get<User>('SELECT * FROM users WHERE id = ? AND guildId = ?;', [
    id,
    guildId,
  ]);
}

function create(user: User) {
  const insertSql = 'INSERT INTO users (id, username, guildId) VALUES (?, ?, ?);';

  dbContext.exec(insertSql, [user.id, user.username, user.guildId]);
}

export default {
  get,
  create,
};
