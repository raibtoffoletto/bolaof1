import dbContext from '../db';

function get(id: string) {
  return dbContext.get<GrandPrix>('SELECT * FROM grandsprix WHERE id = ?;', [id]);
}

function list() {
  return dbContext.query<GrandPrix>('SELECT * FROM grandsprix ORDER BY date;');
}

function find(timestamp: number) {
  return dbContext.query<GrandPrix>(
    'select * from grandsprix where date > ? AND ? > date - (48 * 60 * 60 * 1000);',
    [timestamp, timestamp],
  );
}

function create(grandprix: GrandPrix) {
  const insertSql =
    'INSERT INTO grandsprix (id, name, country, circuit, date, polePosition, firstPlace, secondPlace, thirdPlace) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);';

  dbContext.exec(insertSql, [
    grandprix.id,
    grandprix.name,
    grandprix.country,
    grandprix.circuit,
    grandprix.date,
    grandprix.polePosition ?? null,
    grandprix.firstPlace ?? null,
    grandprix.secondPlace ?? null,
    grandprix.thirdPlace ?? null,
  ]);
}

export default {
  get,
  list,
  find,
  create,
};
