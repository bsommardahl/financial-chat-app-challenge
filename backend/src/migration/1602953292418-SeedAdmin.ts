import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedAdmin1602953292418 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO users ("socketId", username)
        VALUES ('ADMIN', 'admin');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
