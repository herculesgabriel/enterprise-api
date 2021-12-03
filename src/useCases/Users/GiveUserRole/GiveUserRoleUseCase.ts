import { getCustomRepository } from 'typeorm';

import { AppError, ErrorsMapper } from '../../../errors';
import { RolesRepository, UsersRepository } from '../../../repositories';

type GiveUserRoleData = {
  user_id: string;
  role_id: string;
};

export class GiveUserRoleUseCase {
  async execute({ user_id, role_id }: GiveUserRoleData): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const foundUser = await usersRepository.findOne(user_id, { relations: ['roles'] });
    if (!foundUser) throw new AppError(ErrorsMapper.NOT_FOUND, 'user does not exist');

    const rolesRepository = getCustomRepository(RolesRepository);
    const foundRole = await rolesRepository.findOne(role_id);
    if (!foundRole) throw new AppError(ErrorsMapper.NOT_FOUND, 'role does not exist');

    const hasRoleAlready = foundUser?.roles.find(role => role.id === role_id);
    if (hasRoleAlready)
      throw new AppError(ErrorsMapper.CONFLICT, 'user already has permission');

    foundUser.roles.push(foundRole);
    await usersRepository.save(foundUser);
  }
}
