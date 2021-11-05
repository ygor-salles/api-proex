import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createBuilding1630182508653 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'buildings',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'latitude',
            type: 'decimal',
          },
          {
            name: 'longitude',
            type: 'decimal',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'organization_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            name: 'FKOrganization',
            referencedTableName: 'organizations',
            referencedColumnNames: ['id'],
            columnNames: ['organization_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('buildings');
  }
}
