import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import HTTPException from '../exceptions/HttpException';

const roles = (
  data: Record<string, any> = {},
  errMsg: Record<string, any> = {},
  content: keyof Request = 'body',
) => {
  data.token = Joi.allow();
  const schema = Joi.object(data);
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const value = await schema.validateAsync(req[content], data);
      next();
    } catch (error: any) {
      const err: HTTPException = new HTTPException(
        400,
        error.message ? error.message : errMsg[error.details[0].context.key],
        error,
      );
      next(err);
    }
  };
};

export default {
  roles,
};