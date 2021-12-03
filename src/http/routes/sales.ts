import { Router } from 'express';

import { ensureAuthenticated, ensureHasPermission } from '../../middlewares';
import { createSaleValidation } from '../../middlewares/validation';
import { CreateSaleController, FindAllSalesController } from '../../useCases/Sales';

export const salesRoutes = Router();

const createSaleController = new CreateSaleController();
const findAllSalesController = new FindAllSalesController();

salesRoutes.use(ensureAuthenticated, ensureHasPermission(['sales']));

salesRoutes
  .route('/sales')
  .get(findAllSalesController.handle)
  .post(createSaleValidation, createSaleController.handle);
