import dbContext from '../db';

function list(grandprixId: string, guildId: string) {
  return dbContext.query<Prediction>(
    'SELECT * FROM predictions WHERE grandprixId = ? AND guildId = ?;',
    [grandprixId, guildId],
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
    'INSERT INTO predictions (grandprixId, userId, guildId, polePosition, firstPlace, secondPlace, thirdPlace) VALUES (?, ?, ?, ?, ?, ?, ?);';

  dbContext.exec(insertSql, [
    prediction.grandprixId,
    prediction.userId,
    prediction.guildId,
    prediction.polePosition,
    prediction.firstPlace,
    prediction.secondPlace,
    prediction.thirdPlace,
  ]);
}

function update(prediction: Prediction) {
  const insertSql =
    'UPDATE predictions SET polePosition = ?, firstPlace = ?, secondPlace = ?, thirdPlace = ? WHERE grandprixId = ? AND userId = ? AND guildId = ?;';

  dbContext.exec(insertSql, [
    prediction.polePosition,
    prediction.firstPlace,
    prediction.secondPlace,
    prediction.thirdPlace,
    prediction.grandprixId,
    prediction.userId,
    prediction.guildId,
  ]);
}

export default {
  list,
  get,
  create,
  update,
};
