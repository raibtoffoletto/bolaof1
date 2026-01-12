import type { Client } from 'discord.js';
import type { RequestHandler } from 'express';
import DRIVERS from '../data/repos/drivers';
import GPs from '../data/repos/grandsprix';
import PREDICTIONS from '../data/repos/predictions';
import { POINTS } from '../lib/constants';

function updatePredictions(gp: GrandPrix) {
  const predictions = PREDICTIONS.listByGp(gp.id);
  const isSprint = gp.id.includes('S');

  for (const prediction of predictions) {
    let points = 0;
    const _prediction = { ...prediction };

    if (gp.polePosition === prediction.polePosition) {
      points += isSprint ? POINTS.SPOLE : POINTS.POLE;
    }

    if (gp.firstPlace === prediction.firstPlace) {
      points += isSprint ? POINTS.SP1 : POINTS.P1;
    }

    if (gp.secondPlace === prediction.secondPlace) {
      points += isSprint ? POINTS.SP2 : POINTS.P2;
    }

    if (gp.thirdPlace === prediction.thirdPlace) {
      points += isSprint ? POINTS.SP3 : POINTS.P3;
    }

    PREDICTIONS.update({ ..._prediction, points, grandprixId: gp.id });
  }
}

const gpUpdateHandler: (client: Client) => RequestHandler =
  (client) => async (req, res) => {
    try {
      const chunks = [];

      for await (const chunk of req) {
        chunks.push(chunk);
      }

      const payload = JSON.parse(Buffer.concat(chunks).toString());
      const polePosition = Number(payload.polePosition);
      const firstPlace = Number(payload.firstPlace);
      const secondPlace = Number(payload.secondPlace);
      const thirdPlace = Number(payload.thirdPlace);

      if (
        !payload.id ||
        !polePosition ||
        !firstPlace ||
        !secondPlace ||
        !thirdPlace ||
        isNaN(polePosition) ||
        isNaN(firstPlace) ||
        isNaN(secondPlace) ||
        isNaN(thirdPlace)
      ) {
        throw new Error('Missing required fields');
      }

      const driverIds = DRIVERS.list().map((d) => d.id);
      if (
        [polePosition, firstPlace, secondPlace, thirdPlace].filter(
          (id) => !driverIds.includes(id),
        ).length > 0
      ) {
        throw new Error('One or more driver IDs are invalid');
      }

      const gp = GPs.get(payload.id);
      if (!gp) {
        throw new Error('Could not find Grand Prix');
      }

      const updatedGP = { ...gp, polePosition, firstPlace, secondPlace, thirdPlace };
      GPs.update(updatedGP);

      updatePredictions(updatedGP);

      // TODO: Client send message with latest results and rank

      res.statusCode = 200;
      res.statusMessage = 'OK';
      res.end();
    } catch (error: any) {
      res.statusCode = 500;
      res.statusMessage = error.message || 'Internal Server Error';
      res.end();
    }
  };

export default gpUpdateHandler;
