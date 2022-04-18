import verifyAmount from "./checkAmount.js";
import * as businessesServices from "./businesesServices.js";
import * as cardsServices from "./cardsServices.js";
import * as paymentsRepository from "../repositories/paymentRepository.js";
import * as error from "../errors/index.js";

interface Payment {
  cardId: number;
  password: string;
  businessId: number;
  amount: number;
}

export async function createPayment(payment: Payment) {
  const { cardId, businessId, amount } = payment;

  const business = await businessesServices.getById(businessId);
  const card = await cardsServices.getById(cardId);
  if (business.type !== card.type)
    throw error.Forbidden("This card isn't allowed in this business.");

  cardsServices.verifyExpirationDate(card);

  verifyAmount(amount);

  await verifyBalance(cardId, amount);

  await paymentsRepository.insert(payment);
}

export async function verifyBalance(cardId: number, amount: number) {
  const balance = await cardsServices.getBalance(cardId);

  if (amount > balance)
    throw error.Forbidden(`Insufficient balance.
    Balance: ${balance}`);
}

export async function sumPayments(cardId: number) {
  const payments = await paymentsRepository.findByCardId(cardId);

  const initialValue = 0;
  const sum = payments.reduce(
    (acc, current) => acc + current.amount,
    initialValue
  );

  return sum;
}
