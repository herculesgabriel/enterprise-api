import { Request, Response } from 'express';

import { CreateRoleUseCase } from './CreateRoleUseCase';
import { RoleMapper } from '../../../mappers/Role';

export class CreateRoleController {
  async handle(request: Request, response: Response) {
    const createRoleUseCase = new CreateRoleUseCase();
    const role = await createRoleUseCase.execute(request.body);
    const roleDTO = RoleMapper.toDTO(role);

    response.status(201).json(roleDTO);
  }
}
