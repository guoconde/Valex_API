import * as error from "../errors/index.js";

export default function verifyAmount(amount: number) {
  if (amount % 1 !== 0)
    throw error.UnprocessableEntity("Amount must be in cents of BRL");

  if (amount <= 0)
    throw error.UnprocessableEntity("Amount must be greater than zero.");
}
