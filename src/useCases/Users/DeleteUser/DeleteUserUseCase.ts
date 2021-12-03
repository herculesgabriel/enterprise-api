import { getCustomRepository } from 'typeorm';

import { AppError, ErrorsMapper } from '../../../errors';
import { UsersRepository } from '../../../repositories';

type DeleteUserData = {
  idUserToBeDeleted: string;
  authenticatedUserId: string;
};

export class DeleteUserUseCase {
  async execute({
    idUserToBeDeleted: idToBeDeleted,
    authenticatedUserId
  }: DeleteUserData): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOneOrFail(authenticatedUserId, {
      relations: ['roles']
    });

    const isAdmin = user.roles.some(role => role.alias === 'admin');

    if (idToBeDeleted !== authenticatedUserId && !isAdmin) {
      throw new AppError(ErrorsMapper.FORBIDDEN, 'you can only delete your own account');
    }

    try {
      await usersRepository.delete(idToBeDeleted);
    } catch (error) {
      throw new AppError(ErrorsMapper.NOT_FOUND, 'user not found');
    }
  }
}
