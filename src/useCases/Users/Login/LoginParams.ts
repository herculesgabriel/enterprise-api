import { ParamConfig } from '../../../middlewares/validateParams';

export const loginParams: ParamConfig[] = [
  {
    name: 'email',
    required: true,
    type: 'string',
    in: 'body'
  },
  {
    name: 'password',
    required: true,
    type: 'string',
    in: 'body'
  }
];
