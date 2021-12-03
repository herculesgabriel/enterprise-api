import { MigrationInterface, QueryRunner } from 'typeorm';

export class seedUsersRoles1638477350552 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO user_roles (id, user_id, role_id)
      VALUES (
        '58f84b40-8fc5-4dda-8957-1e3a61a0f093',
        'f06eeff7-70cd-422b-93e6-b381fdea1cd1',
        '4094e647-7a7f-4179-baa9-1b168bb059c4'
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM user_roles WHERE id = '58f84b40-8fc5-4dda-8957-1e3a61a0f093'`
    );
  }
}
