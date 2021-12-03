import { Request, Response } from 'express';

import { FindUsersUseCase } from './FindUsersUseCase';
import { UserMapper } from '../../../mappers/User';

export class FindUsersController {
  async handle(_request: Request, response: Response) {
    const findUsersUseCase = new FindUsersUseCase();
    const users = await findUsersUseCase.execute();
    const usersDTO = users.map(UserMapper.toDTO);

    response.status(200).json(usersDTO);
  }
}
