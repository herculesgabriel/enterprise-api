import { EntityRepository, Repository } from 'typeorm';

import { User } from '../entities';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {}
