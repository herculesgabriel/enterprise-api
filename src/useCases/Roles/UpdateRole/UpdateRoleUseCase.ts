import { getCustomRepository } from 'typeorm';

import { Role } from '../../../entities';
import { RoleMapper } from '../../../mappers/Role';
import { RolesRepository } from '../../../repositories';
import { AppError, ErrorsMapper } from '../../../errors';

type UpdateRoleData = {
  id: string;
  title: string;
  description: string;
  alias: string;
};

export class UpdateRoleUseCase {
  async execute({ id, title, description, alias }: UpdateRoleData): Promise<Role> {
    const rolesRepository = getCustomRepository(RolesRepository);

    let roleToUpdate: Role;
    try {
      roleToUpdate = await rolesRepository.findOneOrFail(id);
      console.log(roleToUpdate);
    } catch (error) {
      throw new AppError(ErrorsMapper.NOT_FOUND, 'role not found');
    }

    const foundRole = await rolesRepository.findOne({ alias });

    if (foundRole && foundRole?.id !== id) {
      throw new AppError(ErrorsMapper.CONFLICT, 'role already exists');
    }

    roleToUpdate.title = title;
    roleToUpdate.description = description;
    roleToUpdate.alias = alias;

    const userPersistance = RoleMapper.toPersistance(roleToUpdate);

    try {
      await rolesRepository.update(id, userPersistance);
      return roleToUpdate;
    } catch (error) {
      throw new AppError(ErrorsMapper.INTERNAL_SERVER_ERROR, 'something went wrong');
    }
  }
}
