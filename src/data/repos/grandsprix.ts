import { VOTING_OPENS_HOURS } from '../../lib/constants';
import dbContext from '../db';

function get(id: string) {
  return dbContext.get<GrandPrix>('SELECT * FROM grandsprix WHERE id = ?;', [id]);
}

function list() {
  return dbContext.query<GrandPrix>('SELECT * FROM grandsprix ORDER BY date;');
}

function find(timestamp: number) {
  return dbContext.query<GrandPrix>(
    'SELECT * FROM grandsprix WHERE date > ? AND ? > date - ?;',
    [timestamp, timestamp, VOTING_OPENS_HOURS * 60 * 60 * 1000],
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

function update(grandprix: GrandPrix) {
  const insertSql =
    'UPDATE grandsprix SET polePosition = ?, firstPlace = ?, secondPlace = ?, thirdPlace = ? WHERE id = ?;';

  dbContext.exec(insertSql, [
    grandprix.polePosition ?? null,
    grandprix.firstPlace ?? null,
    grandprix.secondPlace ?? null,
    grandprix.thirdPlace ?? null,
    grandprix.id,
  ]);
}

export default {
  get,
  list,
  find,
  create,
  update,
};
