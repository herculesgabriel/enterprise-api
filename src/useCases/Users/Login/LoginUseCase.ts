import { getCustomRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';

import { UsersRepository } from '../../../repositories';
import { authConfig } from '../../../config/auth';
import { AppError, ErrorsMapper } from '../../../errors';

type LoginData = {
  email: string;
  password: string;
};

export class LoginUseCase {
  async execute({ email, password }: LoginData) {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findOne({ email });

    if (!user) {
      throw new AppError(
        ErrorsMapper.NOT_FOUND,
        "The e-mail provided doesn't belong to any user"
      );
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError(ErrorsMapper.BAD_REQUEST, 'The email/password is wrong');
    }

    const token = sign({ email: user.email }, authConfig.SECRET, {
      subject: user.id,
      algorithm: 'HS256',
      expiresIn: '1d'
    });

    return token;
  }
}
