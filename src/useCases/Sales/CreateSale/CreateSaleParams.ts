import { ParamConfig } from '../../../middlewares';

export const createSaleParams: ParamConfig[] = [
  {
    name: 'sale_id',
    required: true,
    type: 'string',
    in: 'body'
  },
  {
    name: 'customer_id',
    required: true,
    type: 'string',
    in: 'body'
  },
  {
    name: 'total',
    required: true,
    type: 'string',
    in: 'body'
  }
];
