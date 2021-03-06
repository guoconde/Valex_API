import { NextFunction, Request, Response } from 'express';
import * as error from '../errors/index.js';
import * as repository from '../repositories/cardsRepository.js';

export async function validateCardId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let cardId = Number(req.params.cardId);

  if (!cardId) cardId = req.body.cardId;
  if (!cardId || cardId === NaN || cardId % 1 !== 0) throw errors.NotFound();

  const card = await repository.findById(cardId);
  if (!card) throw error.NotFound();

  res.locals.card = card;

  next();
}