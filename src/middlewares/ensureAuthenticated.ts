import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { authConfig } from '../config/auth';
import { AppError, ErrorsMapper } from '../errors';

type IPayload = {
  email: string;
  sub: string;
};

export function ensureAuthenticated(
  request: Request,
  _response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AppError(ErrorsMapper.UNAUTHORIZED, 'Token is missing');
  }

  const [_bearer, token] = authorization.split(' ');

  if (!token || token.length < 50) {
    throw new AppError(ErrorsMapper.UNAUTHORIZED, 'Invalid token');
  }

  const data = verify(token, authConfig.SECRET);

  if (!data) {
    throw new AppError(ErrorsMapper.INTERNAL_SERVER_ERROR, 'Internal error');
  }

  request.user = {
    user_id: (data as IPayload).sub,
    email: (data as IPayload).email
  };

  next();
}
