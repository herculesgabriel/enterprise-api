import { getCustomRepository } from 'typeorm';

import { AppError, ErrorsMapper } from '../../../errors';
import { RolesRepository } from '../../../repositories';

export class DeleteRoleUseCase {
  async execute(id: string): Promise<void> {
    const rolesRepository = getCustomRepository(RolesRepository);

    try {
      await rolesRepository.delete(id);
    } catch (error) {
      throw new AppError(ErrorsMapper.NOT_FOUND, 'role not found');
    }
  }
}
