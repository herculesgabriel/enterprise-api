import { getCustomRepository } from 'typeorm';

import { User } from '../../../entities';
import { AppError, ErrorsMapper } from '../../../errors';
import { UserMapper } from '../../../mappers/User';
import { UsersRepository } from '../../../repositories';

type UpdateUserData = {
  idUserToUpdate: string;
  authenticatedUserId: string;
  userToUpdateData: {
    first_name: string;
    last_name: string;
    email: string;
  };
};

export class UpdateUserUseCase {
  async execute({
    idUserToUpdate,
    authenticatedUserId,
    userToUpdateData
  }: UpdateUserData): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    let userToUpdate: User;

    try {
      userToUpdate = await usersRepository.findOneOrFail(idUserToUpdate, {
        relations: ['roles']
      });
    } catch (error) {
      throw new AppError(ErrorsMapper.NOT_FOUND, 'user not found');
    }

    const authenticatedUser = await usersRepository.findOneOrFail(authenticatedUserId, {
      relations: ['roles']
    });

    const isAdmin = authenticatedUser.roles.some(role => role.alias === 'admin');

    if (idUserToUpdate !== authenticatedUserId && !isAdmin) {
      throw new AppError(ErrorsMapper.FORBIDDEN, 'you can only update your own account');
    }

    const foundUser = await usersRepository.findOne({ email: userToUpdateData.email });

    if (foundUser && foundUser?.id !== idUserToUpdate) {
      throw new AppError(ErrorsMapper.CONFLICT, 'email already taken');
    }

    userToUpdate.firstName = userToUpdateData.first_name;
    userToUpdate.lastName = userToUpdateData.last_name;
    userToUpdate.email = userToUpdateData.email;

    const userPersistance = UserMapper.toPersistance(userToUpdate);

    try {
      await usersRepository.update(idUserToUpdate, userPersistance);
      return userToUpdate;
    } catch (error) {
      throw new AppError(ErrorsMapper.INTERNAL_SERVER_ERROR, 'something went wrong');
    }
  }
}
