import { getCustomRepository } from 'typeorm';

import { User } from '../../../entities';
import { AppError, ErrorsMapper } from '../../../errors';
import { UsersRepository } from '../../../repositories';

export class FindUserUseCase {
  async execute(id: string): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    try {
      const user = await usersRepository.findOneOrFail(id, { relations: ['roles'] });
      return user;
    } catch (error) {
      throw new AppError(ErrorsMapper.NOT_FOUND, 'user not found');
    }
  }
}
