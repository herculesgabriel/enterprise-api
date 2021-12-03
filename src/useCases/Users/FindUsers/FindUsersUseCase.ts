import { getCustomRepository } from 'typeorm';

import { User } from '../../../entities';
import { UsersRepository } from '../../../repositories';

export class FindUsersUseCase {
  async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository);
    const users = await usersRepository.find({ relations: ['roles'] });

    return users;
  }
}
