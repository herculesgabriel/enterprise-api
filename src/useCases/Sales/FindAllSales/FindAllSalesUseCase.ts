import { getCustomRepository } from 'typeorm';

import { Sale } from '../../../entities';
import { SalesRepository } from '../../../repositories';

export class FindAllSalesUseCase {
  async execute(): Promise<Sale[]> {
    const salesRepository = getCustomRepository(SalesRepository);
    const sales = await salesRepository.find();

    return sales;
  }
}
