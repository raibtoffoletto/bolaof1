import dbContext from '../db';

function get() {
  return dbContext.get<Instance>('SELECT * FROM instances;', []);
}

function create(instance: Instance) {
  const insertSql = 'INSERT INTO instances (guildId, name, channelId) VALUES (?, ?, ?);';

  dbContext.exec(insertSql, [instance.guildId, instance.name, instance.channelId]);
}

export default {
  get,
  create,
};
