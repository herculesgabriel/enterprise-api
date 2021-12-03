import { Request, Response } from 'express';

import { FindUserUseCase } from './FindUserUseCase';
import { UserMapper } from '../../../mappers/User';

export class FindUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const findUserUseCase = new FindUserUseCase();
    const user = await findUserUseCase.execute(id);
    const userDTO = UserMapper.toDTO(user);

    response.status(200).json(userDTO);
  }
}
