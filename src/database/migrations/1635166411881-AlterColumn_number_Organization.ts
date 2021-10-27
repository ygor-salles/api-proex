import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterColumnNumberOrganization1635166411881 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE organizations ALTER COLUMN number TYPE INTEGER`);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE organizations ALTER COLUMN number TYPE NUMERIC`);
  }
}
