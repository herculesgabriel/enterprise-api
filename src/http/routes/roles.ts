import { Router } from 'express';

import {
  ensureAuthenticated,
  ensureHasPermission,
  validateParams
} from '../../middlewares';
import { createRoleParams } from '../../useCases/Roles/params';
import { updateRoleParams } from '../../useCases/Roles/UpdateRole/UpdateRoleParams';
import {
  CreateRoleController,
  DeleteRoleController,
  FindRoleController,
  FindRolesController,
  UpdateRoleController
} from '../../useCases/Roles/controllers';

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
  .post(
    ensureHasPermission(['admin']),
    validateParams(createRoleParams),
    createRoleController.handle
  );

rolesRoutes
  .route('/roles/:id')
  .get(findRoleController.handle)
  .put(
    ensureHasPermission(['admin']),
    validateParams(updateRoleParams),
    updateRoleController.handle
  )
  .delete(ensureHasPermission(['admin']), deleteRoleController.handle);
