import { getCustomRepository } from 'typeorm';

import { Role } from '../../../entities';
import { AppError, ErrorsMapper } from '../../../errors';
import { RolesRepository } from '../../../repositories';

export class FindRoleUseCase {
  async execute(id: string): Promise<Role> {
    const rolesRepository = getCustomRepository(RolesRepository);
    try {
      const role = await rolesRepository.findOneOrFail(id);
      return role;
    } catch (error) {
      throw new AppError(ErrorsMapper.NOT_FOUND, 'role not found');
    }
  }
}
