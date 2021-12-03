import { Request, Response } from 'express';

import { RoleMapper } from '../../../mappers/Role';
import { FindRoleUseCase } from './FindRoleUseCase';

export class FindRoleController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const findRoleUseCase = new FindRoleUseCase();
    const role = await findRoleUseCase.execute(id);
    const roleDTO = RoleMapper.toDTO(role);

    response.status(200).json(roleDTO);
  }
}
