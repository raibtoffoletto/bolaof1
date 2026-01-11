import dbContext from '../db';

function get(grandprixId: string, channelId: string) {
  return dbContext.get<GPNotification>(
    'SELECT * FROM notifications WHERE grandprixId = ? AND channelId = ?;',
    [grandprixId, channelId],
  );
}

function create(
  grandprixId: string,
  channelId: string,
  messageId: string,
  locked = false,
) {
  const insertSql =
    'INSERT INTO notifications (grandprixId, channelId, messageId, locked) VALUES (?, ?, ?, ?);';

  dbContext.exec(insertSql, [grandprixId, channelId, messageId, locked ? 1 : 0]);
}

function lock(grandprixId: string, channelId: string) {
  return dbContext.get<GPNotification>(
    'UPDATE notifications SET locked = 1 WHERE grandprixId = ? AND channelId = ?;',
    [grandprixId, channelId],
  );
}

export default {
  get,
  create,
  lock,
};
