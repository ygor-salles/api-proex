import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterColumnNumberOrganization1635166411881 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE organizations ALTER COLUMN number TYPE INTEGER`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE organizations ALTER COLUMN number TYPE NUMERIC`);
  }
}
