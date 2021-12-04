import { ParamConfig } from '../../../middlewares';

export const createUserParams: ParamConfig[] = [
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
  },
  {
    name: 'password',
    required: true,
    type: 'string',
    in: 'body',
    minLength: 6,
    maxLength: 20
  }
];
