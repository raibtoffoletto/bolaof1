import type { RequestHandler } from 'express';
import { createReadStream } from 'node:fs';
import { join } from 'node:path';

const scriptHandler: RequestHandler = async (_, res) => {
  const dirname = new URL('.', import.meta.url).pathname;

  const filePath = join(dirname, 'app.js');

  res.setHeader('Content-Type', 'application/javascript');
  createReadStream(filePath).pipe(res);
};

export default scriptHandler;
