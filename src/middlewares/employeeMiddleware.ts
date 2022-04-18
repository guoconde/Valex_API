import { NextFunction, Request, Response } from 'express';
import * as services from '../services/employeesServices.js';
import * as error from '../errors/index.js';

export default async function validateEmployeeId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { employeeId }: { employeeId: number } = req.body;
  const { company } = res.locals;

  const employee = await services.getById(employeeId);

  if (company.id !== employee.companyId) throw error.Unauthorized();

  res.locals.employee = employee;

  next();
}