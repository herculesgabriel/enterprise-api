import { Role } from '../../entities';

export interface IUserDTO {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  roles: Role[];
  created_at: Date;
  updated_at: Date;
}
