import { Request, Response } from 'express';

import { RoleMapper } from '../../../mappers/Role';
import { FindRolesUseCase } from './FindRolesUseCase';

export class FindRolesController {
  async handle(_request: Request, response: Response) {
    const findRolesUseCase = new FindRolesUseCase();
    const roles = await findRolesUseCase.execute();
    const rolesDTO = roles.map(RoleMapper.toDTO);

    response.status(200).json(rolesDTO);
  }
}
