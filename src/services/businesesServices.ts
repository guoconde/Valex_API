import * as businessesRepository from "../repositories/businessRepository.js";
import * as error from "../errors/index.js";

export async function getById(businessId: number) {
  const business = await businessesRepository.findById(businessId);
  if (!business) throw error.NotFound();
  return business;
}
