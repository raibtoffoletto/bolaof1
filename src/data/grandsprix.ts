import dbContext from './db';

function get(id: string) {
  return dbContext.get<GrandPrix>('SELECT * FROM grandsprix WHERE id = ?;', [id]);
}

function list() {
  return dbContext.query<GrandPrix>('SELECT * FROM grandsprix ORDER BY date;');
}

function create(grandprix: GrandPrix) {
  const insertSql =
    'INSERT INTO grandsprix (id, name, country, circuit, date) VALUES (?, ?, ?, ?, ?);';

  dbContext.exec(insertSql, [
    grandprix.id,
    grandprix.name,
    grandprix.country,
    grandprix.circuit,
    grandprix.date,
  ]);
}

export default {
  get,
  list,
  create,
};
