import { Router } from 'express';

import {
  ensureAuthenticated,
  ensureHasPermission,
  validateParams
} from '../../middlewares';
import {
  CreateUserController,
  DeleteUserController,
  FindUserController,
  FindUsersController,
  GiveUserRoleController,
  LoginController,
  UpdateUserController
} from '../../useCases/Users/controllers';
import {
  loginParams,
  createUserParams,
  updateUserParams,
  giveUserRoleParams
} from '../../useCases/Users/params';

export const usersRoutes = Router();

const loginController = new LoginController();
const createUserController = new CreateUserController();
const findUsersController = new FindUsersController();
const findUserController = new FindUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const giveUserRoleController = new GiveUserRoleController();

usersRoutes.post('/login', validateParams(loginParams), loginController.handle);
usersRoutes.post(
  '/users',
  validateParams(createUserParams),
  createUserController.handle
);

usersRoutes.use(ensureAuthenticated);

usersRoutes.get('/users', findUsersController.handle);

usersRoutes
  .route('/users/:id')
  .get(findUserController.handle)
  .put(validateParams(updateUserParams), updateUserController.handle)
  .delete(deleteUserController.handle);

usersRoutes.post(
  '/users/roles',
  ensureHasPermission(['admin']),
  validateParams(giveUserRoleParams),
  giveUserRoleController.handle
);
