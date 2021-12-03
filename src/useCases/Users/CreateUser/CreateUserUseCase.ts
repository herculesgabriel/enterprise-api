import { getCustomRepository } from 'typeorm';
import { hash } from 'bcrypt';

import { User } from '../../../entities';
import { UsersRepository } from '../../../repositories';
import { UserMapper } from '../../../mappers/User';
import { AppError, ErrorsMapper } from '../../../errors';

type CreateUserData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export class CreateUserUseCase {
  async execute({
    first_name,
    last_name,
    email,
    password
  }: CreateUserData): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userAlreadyExists = await usersRepository.findOne({ email });

    if (userAlreadyExists) {
      throw new AppError(ErrorsMapper.CONFLICT, 'user already exists');
    }

    const passwordHash = await hash(password, 10);

    const user = UserMapper.toEntity({
      first_name,
      last_name,
      email,
      roles: [],
      password: passwordHash
    });

    const newUser = usersRepository.create(user);
    await usersRepository.save(newUser);

    return newUser;
  }
}
