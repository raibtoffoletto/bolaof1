import type { RequestHandler } from 'express';
import GPs from '../data/repos/grandsprix';
import PREDICTIONS from '../data/repos/predictions';
import getPage from './getPage';

const grandprixHandler: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const gp = GPs.get(id);

  if (!gp) {
    res.end(getPage({ content: 'Grand Prix not found' }));

    return;
  }

  // Basic info
  let content = `<table>`;
  content += `<tr>`;
  content += `<td><b>GP:</b> ${gp.name}</td>`;
  content += `<td><b>Pole Position:</b> ${gp.polePosition}</td>`;
  content += `</tr><tr>`;
  content += `<td><b>Country:</b> ${gp.country}</td>`;
  content += `<td><b>First Place:</b> ${gp.firstPlace}</td>`;
  content += `</tr><tr>`;
  content += `<td><b>Circuit:</b> ${gp.circuit}</td>`;
  content += `<td><b>Second Place:</b> ${gp.secondPlace}</td>`;
  content += `</tr><tr>`;
  content += `<td><b>Date:</b> ${new Date(Number(gp.date)).toUTCString()}</td>`;
  content += `<td><b>Third Place:</b> ${gp.thirdPlace}</td>`;
  content += `</tr>`;
  content += `</table>`;
  content += `<hr />`;

  // Update form
  content += `<h2>Update</h2>`;

  content += `
  <form id="grandsprix-update" onsubmit="handleFormSubmit(event)" style="display: flex;position: relative;">
    <input type="hidden" name="id" value="${gp.id}" />
    
    <div style="flex-grow: 1;">
      <label for="polePosition">Pole Position:</label>
      <input type="text" id="polePosition" name="polePosition" value="${gp.polePosition ?? ''}" required />
    </div>
    <div style="flex-grow: 1;">
      <label for="firstPlace">First Place:</label>
      <input type="text" id="firstPlace" name="firstPlace" value="${gp.firstPlace ?? ''}" required />
    </div>
    <div style="flex-grow: 1;">
      <label for="secondPlace">Second Place:</label>
      <input type="text" id="secondPlace" name="secondPlace" value="${gp.secondPlace ?? ''}" required />
    </div>
    <div style="flex-grow: 1;">
      <label for="thirdPlace">Third Place:</label>
      <input type="text" id="thirdPlace" name="thirdPlace" value="${gp.thirdPlace ?? ''}" required />
    </div>

    <button type="submit" style="align-self: end;">Update</button>
  </form>`;
  content += `<hr />`;

  // Predictions
  const predictions = PREDICTIONS.listByGp(id);
  const columns = Object.keys(predictions[0]).filter(
    (k) => !['guildId', 'userId'].includes(k),
  );

  content += `<h2>Predictions</h2>`;

  const headers = `<thead><tr>${columns.map((col) => `<th>${col}</th>`).join('')}</tr></thead>`;

  let data = '';

  for (const prediction of predictions) {
    let row = '<tr>';

    for (const col of columns) {
      row += `<td>${prediction[col as keyof typeof prediction]}</td>`;
    }

    row += '</tr>';
    data += row;
  }

  content += `<table>
      ${headers}
      <tbody>
        ${data}
      </tbody>
    </table>`;

  res.end(getPage({ title: gp.name, content }));
};

export default grandprixHandler;
