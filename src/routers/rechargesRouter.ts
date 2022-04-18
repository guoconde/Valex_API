import { Router } from 'express';
import validateApiKey from '../middlewares/apiKeyMiddleware.js';
import { validateSchema } from '../middlewares/schemaMiddleware.js';
import schemas from '../schemas/index.js';
import * as controller from '../controllers/rechargesController.js';

const rechargesRouter = Router();

rechargesRouter.post(
  '/recharges',
  validateApiKey,
  validateSchema(schemas.createRechargeSchema),
  controller.createRecharge
);

export default rechargesRouter;