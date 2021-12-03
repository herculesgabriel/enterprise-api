import 'express-async-errors';
import express from 'express';

import { routes } from './routes';
import { errorHandler } from '../middlewares/errorHandler';

const server = express();

server.use(express.json());
server.use(routes);
server.use(errorHandler);

const { PORT = 3333 } = process.env;

server.listen(PORT, () => {
  console.log(`🚀 Server started. Docs: http://localhost:${PORT}/api/docs`);
});
