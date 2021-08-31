import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class addColumnOrganizationId1630369525500 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("buildings", new TableColumn({
            name: "organization_id",
            type: "uuid"
        }));

        await queryRunner.createForeignKey("buildings", new TableForeignKey({
            columnNames: ["organization_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "organizations",
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.clearSqlMemory();
        const table = await queryRunner.getTable("buildings");
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("id") !== -1);
        await queryRunner.dropForeignKey("buildings", foreignKey);
        await queryRunner.dropColumn("buildings", "organization_id");
    }

}
