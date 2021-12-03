import { Request, Response } from 'express';

import { GiveUserRoleUseCase } from './GiveUserRoleUseCase';

export class GiveUserRoleController {
  async handle(request: Request, response: Response) {
    const giveUserRoleUseCase = new GiveUserRoleUseCase();
    await giveUserRoleUseCase.execute(request.body);

    response.status(201).json({ message: 'role given to user' });
  }
}
