import { Router } from 'express';
import * as controller from '../controllers/paymentsController.js';
import { validateCardId } from '../middlewares/cardMiddleware.js';
import { validatePassword } from '../middlewares/passwordMiddleware.js';
import { validateSchema } from '../middlewares/schemaMiddleware.js';
import schemas from '../schemas/index.js';

const purchasesRouter = Router();

purchasesRouter.post(
    '/payments',
    validateSchema(schemas.createPurchaseSchema),
    validateCardId,
    validatePassword,
    controller.createPayment
  );
  
purchasesRouter.post(
    '/payments/online',
    validateSchema(schemas.createOnlinePaymentSchema),
    controller.createOnlinePayment
  );

export default purchasesRouter;
