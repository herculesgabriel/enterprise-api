import { ParamConfig } from '../../../middlewares';

export const updateUserParams: ParamConfig[] = [
  {
    name: 'first_name',
    required: true,
    type: 'string',
    in: 'body'
  },
  {
    name: 'last_name',
    required: true,
    type: 'string',
    in: 'body'
  },
  {
    name: 'email',
    required: true,
    type: 'string',
    in: 'body'
  }
];
