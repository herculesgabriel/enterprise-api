import { getCustomRepository } from 'typeorm';

import { Sale } from '../../../entities';
import { SaleMapper } from '../../../mappers/Sale';
import { SalesRepository } from '../../../repositories';

type CreateSaleData = {
  customer_id: string;
  sale_id: string;
  total: string;
};

export class CreateSaleUseCase {
  async execute({ customer_id, sale_id, total }: CreateSaleData): Promise<Sale> {
    const salesRepository = getCustomRepository(SalesRepository);

    const sale = SaleMapper.toEntity({ customer_id, sale_id, total });
    const newSale = salesRepository.create(sale);
    await salesRepository.save(newSale);

    return newSale;
  }
}
