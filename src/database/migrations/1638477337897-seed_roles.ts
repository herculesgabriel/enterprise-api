import { MigrationInterface, QueryRunner } from 'typeorm';

export class seedRoles1638477337897 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO roles (
        id,
        title,
        description,
        alias
      )
      VALUES (
        '4094e647-7a7f-4179-baa9-1b168bb059c4',
        'Administrator',
        'Can break the whole thing',
        'admin'
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM roles WHERE id = '4094e647-7a7f-4179-baa9-1b168bb059c4'`
    );
  }
}
