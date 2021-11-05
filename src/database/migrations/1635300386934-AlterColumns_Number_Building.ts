import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterColumnsNumberBuilding1635300386934 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE buildings ALTER COLUMN latitude TYPE DOUBLE PRECISION`);
    await queryRunner.query(`ALTER TABLE buildings ALTER COLUMN longitude TYPE DOUBLE PRECISION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE buildings ALTER COLUMN latitude TYPE NUMERIC`);
    await queryRunner.query(`ALTER TABLE buildings ALTER COLUMN longitude TYPE NUMERIC`);
  }
}
