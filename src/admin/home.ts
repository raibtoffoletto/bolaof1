import type { RequestHandler } from 'express';
import getPage from './getPage';

const homeHandler: RequestHandler = (_, res) => {
  res.end(getPage());
};

export default homeHandler;
