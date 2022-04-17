import { Router } from "express";

import cardsRouter from "./cadrRouter";
import purchasesRouter from "./purchasesRouter";
import rechargesRouter from "./rechargesRouter";

const router = Router();

router.use(cardsRouter);
router.use(purchasesRouter);
router.use(rechargesRouter);

export default router;
