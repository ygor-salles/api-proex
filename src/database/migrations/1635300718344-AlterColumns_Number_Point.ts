import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterColumnsNumberPoint1635300718344 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE points ALTER COLUMN floor TYPE INTEGER`);
    await queryRunner.query(`ALTER TABLE points ALTER COLUMN altitude TYPE REAL`);
    await queryRunner.query(`ALTER TABLE points ALTER COLUMN latitude TYPE DOUBLE PRECISION`);
    await queryRunner.query(`ALTER TABLE points ALTER COLUMN longitude TYPE DOUBLE PRECISION`);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE points ALTER COLUMN floor TYPE NUMERIC`);
    await queryRunner.query(`ALTER TABLE points ALTER COLUMN altitude TYPE NUMERIC`);
    await queryRunner.query(`ALTER TABLE points ALTER COLUMN latitude TYPE NUMERIC`);
    await queryRunner.query(`ALTER TABLE points ALTER COLUMN longitude TYPE NUMERIC`);
  }
}
