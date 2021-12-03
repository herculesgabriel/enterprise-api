import { Router } from 'express';
import path from 'path';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';

export const appRoutes = Router();

const swaggerDocument = YAML.load(
  path.resolve(__dirname, '..', '..', 'docs', 'swagger.yml')
);

appRoutes.get('/healthcheck', (_request, response) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now()
  };

  response.status(200).json(healthcheck);
});

appRoutes.use('/api/docs/swagger.json', (_request, response) => {
  response.json({ ...swaggerDocument });
});

appRoutes.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
