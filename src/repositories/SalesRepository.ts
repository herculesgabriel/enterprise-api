import { EntityRepository, Repository } from 'typeorm';

import { Sale } from '../entities';

@EntityRepository(Sale)
export class SalesRepository extends Repository<Sale> {}
