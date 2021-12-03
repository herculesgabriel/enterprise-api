import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';

import { AppError, ErrorsMapper } from '../errors';
import { UsersRepository } from '../repositories/UsersRepository';

export async function ensureAdmin(
  request: Request,
  _response: Response,
  next: NextFunction
) {
  const { user_id } = request.user;

  const usersRepository = getCustomRepository(UsersRepository);
  const user = await usersRepository.findOne(user_id, { relations: ['roles'] });

  const isAdmin = user?.roles.some(role => role.alias === 'admin');
  if (!isAdmin)
    throw new AppError(ErrorsMapper.FORBIDDEN, 'You are not allowed to do this');

  next();
}
