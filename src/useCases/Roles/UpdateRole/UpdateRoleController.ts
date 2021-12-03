import { Request, Response } from 'express';

import { RoleMapper } from '../../../mappers/Role';
import { UpdateRoleUseCase } from './UpdateRoleUseCase';

export class UpdateRoleController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { title, description, alias } = request.body;

    const updateRoleUseCase = new UpdateRoleUseCase();
    const role = await updateRoleUseCase.execute({ id, title, description, alias });
    const roleDTO = RoleMapper.toDTO(role);

    response.status(200).json(roleDTO);
  }
}
