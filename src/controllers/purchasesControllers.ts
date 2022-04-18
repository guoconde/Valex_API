import { Request, Response } from "express";
import * as service from "../services/paymentsServices.js";

export async function createPayment(req: Request, res: Response) {
  const payment = req.body;

  await service.createPayment(payment);

  return res.sendStatus(201);
}
