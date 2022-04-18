import { NextFunction, Request, Response } from 'express';
import * as service from '../services/companiesServices.js';
import * as error from '../errors/index.js';

export default async function validateApiKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { 'x-api-key': key } = req.headers;

  if (Array.isArray(key) || !key) throw error.Unauthorized();

  const company = await service.getCompany(key);
  if (!company) throw error.Unauthorized();

  res.locals.company = company;

  next();
}