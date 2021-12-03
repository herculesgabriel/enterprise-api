import { Router } from 'express';

import { ensureAdmin, ensureAuthenticated } from '../../middlewares';
import { createRoleValidation } from '../../middlewares/validation';
import {
  CreateRoleController,
  DeleteRoleController,
  FindRoleController,
  FindRolesController,
  UpdateRoleController
} from '../../useCases/Roles';

export const rolesRoutes = Router();

const findRolesController = new FindRolesController();
const findRoleController = new FindRoleController();
const createRoleController = new CreateRoleController();
const deleteRoleController = new DeleteRoleController();
const updateRoleController = new UpdateRoleController();

rolesRoutes.use(ensureAuthenticated);

rolesRoutes
  .route('/roles')
  .get(findRolesController.handle)
  .post(ensureAdmin, createRoleValidation, createRoleController.handle);

rolesRoutes
  .route('/roles/:id')
  .get(findRoleController.handle)
  .put(ensureAdmin, updateRoleController.handle)
  .delete(ensureAdmin, deleteRoleController.handle);
