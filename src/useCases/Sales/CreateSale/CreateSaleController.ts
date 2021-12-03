import { Request, Response } from 'express';

import { CreateSaleUseCase } from './CreateSaleUseCase';
import { SaleMapper } from '../../../mappers/Sale';

export class CreateSaleController {
  async handle(request: Request, response: Response) {
    const createSaleUseCase = new CreateSaleUseCase();
    const sale = await createSaleUseCase.execute(request.body);
    const saleDTO = SaleMapper.toDTO(sale);

    response.status(201).json(saleDTO);
  }
}
