import { ParamConfig } from '../../../middlewares';

export const giveUserRoleParams: ParamConfig[] = [
  {
    name: 'user_id',
    required: true,
    type: 'string',
    in: 'body'
  },
  {
    name: 'role_id',
    required: true,
    type: 'string',
    in: 'body'
  }
];
