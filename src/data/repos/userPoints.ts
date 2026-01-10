import dbContext from '../db';

function list(guildId: string) {
  return dbContext.query<UserPoints>('SELECT * FROM userPoints WHERE guildId = ?;', [
    guildId,
  ]);
}

function get(id: string, guildId: string) {
  return dbContext.get<UserPoints>(
    'SELECT * FROM userPoints WHERE id = ? AND guildId = ?;',
    [id, guildId],
  );
}

function create(userPoints: UserPoints) {
  const insertSql = 'INSERT INTO userPoints (userId, guildId, points) VALUES (?, ?, ?);';

  dbContext.exec(insertSql, [userPoints.userId, userPoints.guildId, userPoints.points]);
}

function update(userPoints: UserPoints) {
  const insertSql = 'UPDATE userPoints SET points = ? WHERE userId = ? AND guildId = ?;';

  dbContext.exec(insertSql, [userPoints.points, userPoints.userId, userPoints.guildId]);
}

export default {
  list,
  get,
  create,
  update,
};
