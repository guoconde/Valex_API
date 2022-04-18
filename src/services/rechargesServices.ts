import { Company } from "../repositories/companyRepository.js";
import * as cardServices from "./cardsServices.js";
import * as emplooyeeServices from "./employeesServices.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
import * as error from "../errors/index.js";
import verifyAmount from "./checkAmount.js";

interface Recharge {
  cardId: number;
  amount: number;
}

export async function createRecharge(recharge: Recharge, company: Company) {
  const { cardId, amount } = recharge;

  const card = await cardServices.getById(cardId);

  const employee = await emplooyeeServices.getById(card.employeeId);

  if (employee.companyId !== company.id) throw error.Unauthorized();

  cardServices.verifyExpirationDate(card);

  verifyAmount(amount);

  const insertRecharge = { cardId, amount };

  await rechargeRepository.insert(insertRecharge);
}

export async function sumRecharges(cardId: number) {
  const recharges = await rechargeRepository.findByCardId(cardId);

  const initialValue = 0;
  const sum = recharges.reduce(
    (acc, current) => acc + current.amount,
    initialValue
  );

  return sum;
}
