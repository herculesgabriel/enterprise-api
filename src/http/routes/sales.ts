import { Router } from 'express';

import {
  ensureAuthenticated,
  ensureHasPermission,
  validateParams
} from '../../middlewares';
import { createSaleParams } from '../../useCases/Sales/params';
import {
  CreateSaleController,
  FindAllSalesController
} from '../../useCases/Sales/controllers';

export const salesRoutes = Router();

const createSaleController = new CreateSaleController();
const findAllSalesController = new FindAllSalesController();

salesRoutes.use(ensureAuthenticated, ensureHasPermission(['sales']));

salesRoutes
  .route('/sales')
  .get(findAllSalesController.handle)
  .post(validateParams(createSaleParams), createSaleController.handle);
