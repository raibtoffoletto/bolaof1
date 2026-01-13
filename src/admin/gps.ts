import type { RequestHandler } from 'express';
import GPs from '../data/repos/grandsprix';
import getPage from './getPage';

const gpsHandler: RequestHandler = (_, res) => {
  const gps = GPs.list();

  const columns = Object.keys(gps?.[0] || {});

  const headers = `<thead><tr>${columns.map((col) => `<th>${col}</th>`).join('')}</tr></thead>`;

  let data = '';

  for (const gp of gps) {
    let row = '<tr>';

    for (const col of columns) {
      let value = gp[col as keyof typeof gp];

      if (col === 'id') {
        value = `<b><a href="/gps/${value}">${value}</a></b>`;
      }

      if (col === 'date') {
        value = new Date(Number(value)).toUTCString();
      }

      row += `<td>${value}</td>`;
    }

    row += '</tr>';
    data += row;
  }

  const content = `<table>
    ${headers}
    <tbody>
      ${data}
    </tbody>
  </table>`;

  res.end(getPage({ title: 'Grands Prix', content }));
};

export default gpsHandler;
