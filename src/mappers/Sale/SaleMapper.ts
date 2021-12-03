import { Sale } from '../../entities';
import { ISaleDTO } from './ISaleDTO';

export class SaleMapper {
  public static toDTO(sale: Sale): ISaleDTO {
    return {
      id: sale.id,
      customer_id: sale.customerId,
      sale_id: sale.saleId,
      total: sale.total,
      created_at: sale.createdAt,
      updated_at: sale.updatedAt
    };
  }

  public static toEntity(raw: any): Sale {
    const sale = new Sale();
    sale.saleId = raw.sale_id;
    sale.customerId = raw.customer_id;
    sale.total = raw.total;

    return sale;
  }
}
