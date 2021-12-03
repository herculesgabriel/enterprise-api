import { Request, Response } from 'express';

import { UserMapper } from '../../../mappers/User';
import { UpdateUserUseCase } from './UpdateUserUseCase';

export class UpdateUserController {
  async handle(request: Request, response: Response) {
    const { id: idUserToUpdate } = request.params;
    const { user_id: authenticatedUserId } = request.user;
    const { first_name, last_name, email } = request.body;

    const updateUserUseCase = new UpdateUserUseCase();
    const user = await updateUserUseCase.execute({
      idUserToUpdate,
      authenticatedUserId,
      userToUpdateData: { first_name, last_name, email }
    });
    const userDTO = UserMapper.toDTO(user);

    response.status(200).json(userDTO);
  }
}
