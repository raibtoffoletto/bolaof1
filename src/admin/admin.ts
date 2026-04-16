import type { RequestHandler, Response } from 'express';
import dbContext from '../data/db';
import getPage from './getPage';

function returnJSON<T>(res: Response, data: T) {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ data, statusCode: 200, statusMessage: 'OK' }));
}

export const adminQueryHandler: RequestHandler = async (req, res) => {
  const chunks = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  const payload = JSON.parse(Buffer.concat(chunks).toString());
  const query = String(payload.query);
  const type = String(payload['query-type']);

  if (!query || !type || (type !== 'QUERY' && type !== 'COMMAND')) {
    return returnJSON(res, { error: 'Invalid query or query type', query, type });
  }

  try {
    if (type === 'QUERY') {
      return returnJSON(res, dbContext.query(query, []));
    }

    return returnJSON(res, dbContext.exec(query, []));
  } catch (error: any) {
    return returnJSON(res, { error: error?.message });
  }
};

export const adminPageHandler: RequestHandler = async (_, res) => {
  const content = `
    <form
      id="db-query-form"
      onsubmit="handleQuerySubmit(event)"
      style="display: flex; flex-direction: column; gap: 1em"
    >
      <div style="display: flex; flex-direction: column">
        <label for="query" style="display: none;">SQL:</label>
        <textarea id="query" name="query" rows="2"></textarea>
      </div>
    
      <div style="display: flex; align-items: center; justify-content: flex-end; gap: 1em">
        <input type="radio" id="query" name="query-type" value="QUERY" checked />
        <label for="query">QUERY</label>

        <input type="radio" id="command" name="query-type" value="COMMAND" />
        <label for="command">COMMAND</label>

        <input type="submit" value="Execute Query" />
      </div>
    </form>

    <hr />

    <pre id="result-content">{JSON PREVIEW}</pre>`;

  res.end(getPage({ title: 'Admin', content }));
};
