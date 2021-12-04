import { ParamConfig } from '../../../middlewares/validateParams';

export const createRoleParams: ParamConfig[] = [
  {
    name: 'title',
    required: true,
    type: 'string',
    in: 'body'
  },
  {
    name: 'description',
    required: true,
    type: 'string',
    in: 'body'
  },
  {
    name: 'alias',
    required: true,
    type: 'string',
    in: 'body',
    regex: /([^\w-]|[_A-Z0-9])/
  }
];
