import dbContext from '../db';

function get() {
  return dbContext.get<Guild>('SELECT * FROM guilds;', []);
}

function create(guild: Guild) {
  const insertSql = 'INSERT INTO guilds (id, name, channelId) VALUES (?, ?, ?);';

  dbContext.exec(insertSql, [guild.id, guild.name, guild.channelId]);
}

export default {
  get,
  create,
};
