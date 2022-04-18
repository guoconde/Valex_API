import { NextFunction, Request, Response } from 'express';
import { AnySchema } from 'joi';
import * as error from '../errors/index.js';

export function validateSchema(schema: AnySchema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const validation = schema.validate(req.body, { abortEarly: false });

    if (validation.error) {
      const message = validation.error.details.map(
        (detail: { message: string }) => detail.message.replace(/"/g, '')
      );

      throw error.UnprocessableEntity(message);
    }
    next();
  };
}