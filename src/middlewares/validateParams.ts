import { Request, Response, NextFunction } from 'express';

import { AppError, ErrorsMapper } from '../errors';

export type ParamConfig = {
  name: string;
  required: boolean;
  type: string;
  minLength?: number;
  maxLength?: number;
  regex?: RegExp;
  in: 'query' | 'body';
};

export function validateParams(paramsConfig: ParamConfig[]) {
  return async (request: Request, _response: Response, next: NextFunction) => {
    paramsConfig.forEach(param => {
      const receivedParam: unknown = request[param.in][param.name];

      if (param.required && !receivedParam) {
        throw new AppError(
          ErrorsMapper.BAD_REQUEST,
          `You must provide the param '${param.name}'`
        );
      }

      if (!receivedParam) {
        return;
      }

      if (param.type !== typeof receivedParam) {
        throw new AppError(
          ErrorsMapper.BAD_REQUEST,
          `The param '${param.name}' must be of type '${param.type}'`
        );
      }

      if (
        param.regex &&
        typeof receivedParam === 'string' &&
        param.regex.test(receivedParam)
      ) {
        throw new AppError(ErrorsMapper.BAD_REQUEST, 'wrong pattern');
      }

      if (
        param.minLength &&
        typeof receivedParam === 'string' &&
        receivedParam.length < param.minLength
      ) {
        throw new AppError(
          ErrorsMapper.BAD_REQUEST,
          `The param '${param.name}' must have at least 6 characters`
        );
      }

      if (
        param.maxLength &&
        typeof receivedParam === 'string' &&
        receivedParam.length > param.maxLength
      ) {
        throw new AppError(
          ErrorsMapper.BAD_REQUEST,
          `The param '${param.name}' can have at most 20 characters`
        );
      }
    });

    next();
  };
}
