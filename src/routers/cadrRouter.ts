import { Router } from 'express';
import * as controller from '../controllers/cardsController.js';
import validateApiKey from '../middlewares/validateApiKeyMiddleware.js';
import { validateCardId } from '../middlewares/cardMiddleware.js';
import validateEmployeeId from '../middlewares/employeeMiddleware.js';
import { validatePassword } from '../middlewares/passwordMiddleware.js';
import { validateSchema } from '../middlewares/schemaMiddleware.js';
import schemas from '../schemas/index.js';

const cardsRouter = Router();

cardsRouter.get('/cards/:cardId', validateCardId, controller.readCardData);

cardsRouter.post(
  '/cards',
  validateApiKey,
  validateSchema(schemas.createCardSchema),
  validateEmployeeId,
  controller.createCard
);

cardsRouter.post(
  '/cards/:cardId/virtual',
  validateCardId,
  validatePassword,
  controller.createVirtualCard
);

cardsRouter.post(
  '/cards/:cardId/block',
  validateCardId,
  validatePassword,
  controller.blockCard
);

cardsRouter.post(
  '/cards/:cardId/unblock',
  validateCardId,
  validatePassword,
  controller.unblockCard
);

cardsRouter.patch(
  '/cards/:cardId/activate',
  validateSchema(schemas.activateCardSchema),
  validateCardId,
  controller.activateCard
);

cardsRouter.delete(
  '/cards/:cardId',
  validateCardId,
  validatePassword,
  controller.deleteVirtualCard
);

export default cardsRouter;