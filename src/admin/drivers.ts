import type { RequestHandler } from 'express';
import DRIVERS from '../data/repos/drivers';

import getPage from './getPage';

const driversHandler: RequestHandler = async (_, res) => {
  const drivers = DRIVERS.list();

  const columns = Object.keys(drivers?.[0] || {});

  const headers = `<thead><tr>${columns.map((col) => `<th>${col}</th>`).join('')}</tr></thead>`;

  let data = '';

  for (const driver of drivers) {
    let row = '<tr>';

    for (const col of columns) {
      row += `<td>${driver[col as keyof typeof driver]}</td>`;
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

  res.end(getPage({ title: 'Pilotos', content }));
};

export default driversHandler;
