import { Router } from 'express';

import { ensureAdmin, ensureAuthenticated } from '../../middlewares';
import { createUserValidation, updateUserValidation } from '../../middlewares/validation';
import {
  CreateUserController,
  DeleteUserController,
  FindUserController,
  FindUsersController,
  GiveUserRoleController,
  LoginController,
  UpdateUserController
} from '../../useCases/Users';

export const usersRoutes = Router();

const loginController = new LoginController();
const createUserController = new CreateUserController();
const findUsersController = new FindUsersController();
const findUserController = new FindUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const giveUserRoleController = new GiveUserRoleController();

usersRoutes.post('/login', loginController.handle);
usersRoutes.post('/users', createUserValidation, createUserController.handle);

usersRoutes.use(ensureAuthenticated);

usersRoutes.get('/users', findUsersController.handle);

usersRoutes
  .route('/users/:id')
  .get(findUserController.handle)
  .put(updateUserValidation, updateUserController.handle)
  .delete(deleteUserController.handle);

usersRoutes.post('/users/roles', ensureAdmin, giveUserRoleController.handle);
