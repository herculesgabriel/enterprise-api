import { Request, Response, NextFunction, response } from 'express';

import { AppError, ErrorsMapper } from '../../errors';

export function createSaleValidation(
  request: Request,
  _response: Response,
  next: NextFunction
) {
  const { customer_id, sale_id, total } = request.body;

  if (!sale_id)
    throw new AppError(ErrorsMapper.BAD_REQUEST, 'you must provide a sale_id');
  if (!total) throw new AppError(ErrorsMapper.BAD_REQUEST, 'you must provide an total');
  if (!customer_id)
    throw new AppError(ErrorsMapper.BAD_REQUEST, 'you must provide a customer_id');

  if (typeof sale_id !== 'string')
    throw new AppError(ErrorsMapper.BAD_REQUEST, 'sale_id must be a string');
  if (typeof total !== 'string')
    throw new AppError(ErrorsMapper.BAD_REQUEST, 'total must be a string');
  if (typeof customer_id !== 'string')
    throw new AppError(ErrorsMapper.BAD_REQUEST, 'customer_id must be a string');

  next();
}
