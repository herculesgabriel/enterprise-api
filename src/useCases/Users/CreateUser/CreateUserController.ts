import { Request, Response } from 'express';

import { CreateUserUseCase } from './CreateUserUseCase';
import { UserMapper } from '../../../mappers/User';

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const createUserUseCase = new CreateUserUseCase();
    const user = await createUserUseCase.execute(request.body);
    const userDTO = UserMapper.toDTO(user);

    response.status(201).json(userDTO);
  }
}
