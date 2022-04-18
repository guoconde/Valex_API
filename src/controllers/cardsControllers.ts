import { Request, Response } from "express";
import * as servece from "../services/cardsServices.js";

export async function createCard(req: Request, res: Response) {
  const { cardType } = req.body;
  const { employee, company } = res.locals;

  const card = await service.create(employee, company, cardType);

  res.send(card);
}

export async function activeCard(req: Request, res: Response) {
  const { password, securityCode } = req.body;
  const cardId = Number(req.params.cardId);

  await service.activate(securityCode, password, cardId);

  res.send("Card activated.");
}
