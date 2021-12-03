import { Request, Response } from 'express';

import { DeleteUserUseCase } from './DeleteUserUseCase';

export class DeleteUserController {
  async handle(request: Request, response: Response) {
    const { id: idUserToBeDeleted } = request.params;
    const { user_id: authenticatedUserId } = request.user;

    const deleteUserUseCase = new DeleteUserUseCase();
    await deleteUserUseCase.execute({ idUserToBeDeleted, authenticatedUserId });

    response.status(204).send();
  }
}
