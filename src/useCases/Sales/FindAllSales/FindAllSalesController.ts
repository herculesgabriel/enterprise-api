import { Request, Response } from 'express';

import { SaleMapper } from '../../../mappers/Sale';
import { FindAllSalesUseCase } from './FindAllSalesUseCase';

export class FindAllSalesController {
  async handle(_request: Request, response: Response) {
    const findAllSalesUseCase = new FindAllSalesUseCase();
    const sales = await findAllSalesUseCase.execute();
    const salesDTO = sales.map(SaleMapper.toDTO);

    response.status(200).json(salesDTO);
  }
}
