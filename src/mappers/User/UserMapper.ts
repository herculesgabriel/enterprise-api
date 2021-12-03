import { User } from '../../entities';
import { IUserDTO } from './IUserDTO';

export class UserMapper {
  public static toDTO(user: User): IUserDTO {
    return {
      id: user.id,
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      roles: user.roles,
      created_at: user.createdAt,
      updated_at: user.updatedAt
    };
  }

  public static toPersistance(user: User) {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    };
  }

  public static toEntity(raw: any): User {
    const user = new User();
    user.firstName = raw.first_name;
    user.lastName = raw.last_name;
    user.email = raw.email;
    user.password = raw.password;
    user.roles = raw.roles;

    return user;
  }
}
