import type { RequestHandler } from 'express';
import INSTANCES from '../data/repos/instances';
import PREDICTIONS from '../data/repos/predictions';
import getPage from './getPage';

const homeHandler: RequestHandler = (_, res) => {
  let content = '';
  const instances = INSTANCES.list();

  for (const instance of instances) {
    content += `<h2>${instance.name}</h2>`;
    const predictions = PREDICTIONS.listByGuild(instance.guildId);

    content += '<table><thead><tr><th>Usuário</th><th>Pontos</th></tr></thead><tbody>';

    for (const prediction of predictions) {
      content += `<tr><td>${prediction.username}</td><td>${prediction.points}</td></tr>`;
    }

    content += '</tbody></table>';
    content += '<br />';
  }

  res.end(getPage({ title: 'Classificações', content }));
};

export default homeHandler;
