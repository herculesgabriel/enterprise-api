import { Request, Response, NextFunction } from 'express';

import { AppError, ErrorsMapper } from '../errors';

export async function errorHandler(
  error: any,
  _request: Request,
  response: Response,
  next: NextFunction
) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ error: error.message });
  }

  console.error(error.stack);
  response
    .status(ErrorsMapper.INTERNAL_SERVER_ERROR)
    .json({ message: 'Internal server error' });
}
