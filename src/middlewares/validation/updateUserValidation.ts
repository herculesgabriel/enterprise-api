import { Request, Response, NextFunction } from 'express';

import { AppError, ErrorsMapper } from '../../errors';

export function updateUserValidation(
  request: Request,
  _response: Response,
  next: NextFunction
) {
  const { first_name, last_name, email } = request.body;

  if (!first_name)
    throw new AppError(ErrorsMapper.BAD_REQUEST, 'you must provide a first name');
  if (!last_name)
    throw new AppError(ErrorsMapper.BAD_REQUEST, 'you must provide a last name');
  if (!email) throw new AppError(ErrorsMapper.BAD_REQUEST, 'you must provide a email');

  if (typeof first_name !== 'string')
    throw new AppError(ErrorsMapper.BAD_REQUEST, 'first_name must be a string');
  if (typeof last_name !== 'string')
    throw new AppError(ErrorsMapper.BAD_REQUEST, 'last_name must be a string');
  if (typeof email !== 'string')
    throw new AppError(ErrorsMapper.BAD_REQUEST, 'email must be a string');

  next();
}
