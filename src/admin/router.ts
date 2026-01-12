import type { Client } from 'discord.js';
import type { Polka } from 'polka';
import driversHandler from './drivers';
import gpsHandler from './gps';
import gpUpdateHandler from './gpUpdate';
import grandprixHandler from './grandprix';
import homeHandler from './home';
import scriptHandler from './script';

export default function setupRouter(app: Polka, client: Client) {
  app.get('/', homeHandler);
  app.get('/drivers', driversHandler);
  app.get('/gps', gpsHandler);
  app.post('/gps', gpUpdateHandler(client));
  app.get('/gps/:id', grandprixHandler);
  app.get('/app.js', scriptHandler);
}
