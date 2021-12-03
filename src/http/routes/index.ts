import { Router } from 'express';

import { appRoutes } from './app';
import { usersRoutes } from './users';
import { rolesRoutes } from './roles';
import { salesRoutes } from './sales';

export const routes = Router();

routes.use(appRoutes, usersRoutes, rolesRoutes, salesRoutes);
