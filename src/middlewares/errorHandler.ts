import { Request, Response, NextFunction } from 'express';

import { AppError, ErrorsMapper } from '../errors';

export async function errorHandler(
  error: any,
  _request: Request,
  response: Response,
  next: NextFunction
) {
  if (error instanceof AppError) {
    console.error(error.stack);
    return response.status(error.statusCode).json({ error: error.message });
  }

  response.status(ErrorsMapper.INTERNAL_SERVER_ERROR).json({ message: error.message });
}
