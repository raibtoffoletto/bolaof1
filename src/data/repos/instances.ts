import dbContext from '../db';

function list() {
  return dbContext.query<Instance>('SELECT * FROM instances;', []);
}

function get(guildId: string) {
  return dbContext.get<Instance>('SELECT * FROM instances WHERE guildId = ?;', [guildId]);
}

function create(instance: Instance) {
  const insertSql = 'INSERT INTO instances (guildId, name, channelId) VALUES (?, ?, ?);';

  dbContext.exec(insertSql, [instance.guildId, instance.name, instance.channelId]);
}

function update(instance: Instance) {
  const updateSql = 'UPDATE instances SET name = ?, channelId = ? WHERE guildId = ?;';

  dbContext.exec(updateSql, [instance.name, instance.channelId, instance.guildId]);
}

function remove(id: string) {
  const deleteUsersSql = 'DELETE FROM users WHERE guildId = ?;';
  const deletePredictionsSql = 'DELETE FROM predictions WHERE guildId = ?;';
  const deleteInstanceSql = 'DELETE FROM instances WHERE guildId = ?;';

  dbContext.exec(deleteUsersSql, [id]);
  dbContext.exec(deletePredictionsSql, [id]);
  dbContext.exec(deleteInstanceSql, [id]);
}

export default {
  list,
  get,
  create,
  update,
  remove,
};
