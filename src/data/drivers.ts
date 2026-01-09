import dbContext from './db';

function list() {
  return dbContext.query<Driver>('SELECT * FROM drivers ORDER BY team, name ASC;');
}

function create(driver: Driver) {
  const insertSql = 'INSERT INTO drivers (id, name, team) VALUES (?, ?, ?);';

  dbContext.exec(insertSql, [driver.id, driver.name, driver.team]);
}

export default {
  list,
  create,
};
