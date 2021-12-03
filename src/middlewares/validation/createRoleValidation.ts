import { Request, Response, NextFunction } from 'express';

import { AppError, ErrorsMapper } from '../../errors';

export function createRoleValidation(
  request: Request,
  _response: Response,
  next: NextFunction
) {
  const { title, description, alias } = request.body;

  if (!title) throw new AppError(ErrorsMapper.BAD_REQUEST, 'you must provide a title');
  if (!alias) throw new AppError(ErrorsMapper.BAD_REQUEST, 'you must provide an alias');
  if (!description)
    throw new AppError(ErrorsMapper.BAD_REQUEST, 'you must provide a description');

  if (typeof title !== 'string')
    throw new AppError(ErrorsMapper.BAD_REQUEST, 'title must be a string');
  if (typeof description !== 'string')
    throw new AppError(ErrorsMapper.BAD_REQUEST, 'description must be a string');
  if (typeof alias !== 'string')
    throw new AppError(ErrorsMapper.BAD_REQUEST, 'alias must be a string');

  const ALIAS_REGEX = /([^\w-]|[_A-Z0-9])/;
  const invalidPattern = ALIAS_REGEX.test(alias);

  if (invalidPattern) throw new AppError(ErrorsMapper.BAD_REQUEST, 'wrong alias pattern');

  next();
}
