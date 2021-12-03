import { getCustomRepository } from 'typeorm';

import { Role } from '../../../entities';
import { AppError, ErrorsMapper } from '../../../errors';
import { RolesRepository } from '../../../repositories';

type CreateRoleData = {
  title: string;
  description: string;
  alias: string;
};

export class CreateRoleUseCase {
  async execute({ title, description, alias }: CreateRoleData): Promise<Role> {
    const rolesRepository = getCustomRepository(RolesRepository);
    const roleAlreadyExists = await rolesRepository.findOne({ alias });

    if (roleAlreadyExists) {
      throw new AppError(ErrorsMapper.CONFLICT, 'Role already exists');
    }

    const role = { title, description, alias };
    const newRole = rolesRepository.create(role);
    await rolesRepository.save(newRole);

    return newRole;
  }
}
