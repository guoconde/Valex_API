import { findById } from "../repositories/employeeRepository.js";
import * as error from "../errors/index.js";

export async function getById(employeeId: number) {
  const employee = await findById(employeeId);

  if (!employee) throw error.NotFound();

  return employee;
}
