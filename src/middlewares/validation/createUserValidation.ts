import { Request, Response, NextFunction } from 'express';

import { AppError, ErrorsMapper } from '../../errors';

export function createUserValidation(
  request: Request,
  _response: Response,
  next: NextFunction
) {
  const { first_name, last_name, email, password } = request.body;

  if (!first_name)
    throw new AppError(ErrorsMapper.BAD_REQUEST, 'you must provide a first name');
  if (!last_name)
    throw new AppError(ErrorsMapper.BAD_REQUEST, 'you must provide a last name');
  if (!email) throw new AppError(ErrorsMapper.BAD_REQUEST, 'you must provide a email');
  if (!password)
    throw new AppError(ErrorsMapper.BAD_REQUEST, 'you must provide a password');

  if (typeof first_name !== 'string')
    throw new AppError(ErrorsMapper.BAD_REQUEST, 'first_name must be a string');
  if (typeof last_name !== 'string')
    throw new AppError(ErrorsMapper.BAD_REQUEST, 'last_name must be a string');
  if (typeof email !== 'string')
    throw new AppError(ErrorsMapper.BAD_REQUEST, 'email must be a string');
  if (typeof password !== 'string')
    throw new AppError(ErrorsMapper.BAD_REQUEST, 'password must be a string');

  if (password.length < 6)
    throw new AppError(
      ErrorsMapper.BAD_REQUEST,
      'password must have at least 6 characters'
    );

  next();
}
