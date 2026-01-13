import dbContext from '../db';

function list(grandprixId: string, guildId: string) {
  return dbContext.query<Prediction>(
    'SELECT * FROM predictions WHERE grandprixId = ? AND guildId = ?;',
    [grandprixId, guildId],
  );
}

function listByGp(grandprixId: string) {
  return dbContext.query<GPPrediction>(
    `SELECT i.name as server, p.guildId, p.userId, u.username, p.polePosition, p.firstPlace, p.secondPlace, p.thirdPlace, p.points
      FROM predictions p
      LEFT JOIN users u ON u.id = p.userId
      LEFT JOIN instances i ON i.guildId = p.guildId
      WHERE p.grandprixId = ?
      ORDER BY i.name, u.username;`,
    [grandprixId],
  );
}

function listByGuild(guildId: string) {
  return dbContext.query<UserPoints>(
    `SELECT u.username, sum(p.points) as points
      FROM predictions p
      LEFT JOIN users u ON u.id = p.userId
      WHERE p.guildId = ?
      GROUP BY p.userId
      ORDER BY points DESC`,
    [guildId],
  );
}

function get(grandprixId: string, userId: string, guildId: string) {
  return dbContext.get<Prediction>(
    'SELECT * FROM predictions WHERE grandprixId = ? AND userId = ? AND guildId = ?;',
    [grandprixId, userId, guildId],
  );
}

function create(prediction: Prediction) {
  const insertSql =
    'INSERT INTO predictions (grandprixId, userId, guildId, polePosition, firstPlace, secondPlace, thirdPlace, points) VALUES (?, ?, ?, ?, ?, ?, ?, ?);';

  dbContext.exec(insertSql, [
    prediction.grandprixId,
    prediction.userId,
    prediction.guildId,
    prediction.polePosition,
    prediction.firstPlace,
    prediction.secondPlace,
    prediction.thirdPlace,
    prediction.points,
  ]);
}

function update(prediction: Prediction) {
  const insertSql =
    'UPDATE predictions SET polePosition = ?, firstPlace = ?, secondPlace = ?, thirdPlace = ?, points = ? WHERE grandprixId = ? AND userId = ? AND guildId = ?;';

  dbContext.exec(insertSql, [
    prediction.polePosition,
    prediction.firstPlace,
    prediction.secondPlace,
    prediction.thirdPlace,
    prediction.points,
    prediction.grandprixId,
    prediction.userId,
    prediction.guildId,
  ]);
}

export default {
  list,
  listByGp,
  listByGuild,
  get,
  create,
  update,
};
