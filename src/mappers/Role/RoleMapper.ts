import { IRoleDTO } from '.';
import { Role } from '../../entities';

export class RoleMapper {
  public static toDTO(role: Role): IRoleDTO {
    return {
      id: role.id,
      title: role.title,
      description: role.description,
      alias: role.alias,
      created_at: role.createdAt,
      updated_at: role.updatedAt
    };
  }

  public static toPersistance(role: Role) {
    return {
      title: role.title,
      description: role.description,
      alias: role.alias
    };
  }

  public static toEntity(raw: any): Role {
    const role = new Role();
    role.title = raw.title;
    role.description = raw.description;
    role.alias = raw.alias;
    return role;
  }
}
