import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';

import { UsersRepository } from '../repositories/UsersRepository';
import { AppError, ErrorsMapper } from '../errors';

export function ensureHasPermission(roles: string[]) {
  return async (request: Request, _response: Response, next: NextFunction) => {
    const { user_id } = request.user;

    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findOne(user_id, { relations: ['roles'] });

    const hasPermission = roles.some(role =>
      user?.roles.some(userRole => userRole.alias === role)
    );

    if (!hasPermission) {
      throw new AppError(ErrorsMapper.FORBIDDEN, 'You are not allowed to do this');
    }

    next();
  };
}
