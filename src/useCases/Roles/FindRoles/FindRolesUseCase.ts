import { getCustomRepository } from 'typeorm';

import { Role } from '../../../entities';
import { RolesRepository } from '../../../repositories';

export class FindRolesUseCase {
  async execute(): Promise<Role[]> {
    const rolesRepository = getCustomRepository(RolesRepository);
    const roles = await rolesRepository.find();

    return roles;
  }
}
