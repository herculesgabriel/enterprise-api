import { MigrationInterface, QueryRunner } from 'typeorm';

export class seedUsers1638474110288 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO users (
        id,
        first_name,
        last_name,
        email,
        password
      )
      VALUES (
        'f06eeff7-70cd-422b-93e6-b381fdea1cd1',
        'John',
        'Doe',
        'john@mail.com',
        '$2b$10$bcq81xJRnisFlrKjI4GdyOCfqUbFJt69xKj/D8fBsOEAa8ih3XiJS'
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM users WHERE id = 'f06eeff7-70cd-422b-93e6-b381fdea1cd1'`
    );
  }
}
