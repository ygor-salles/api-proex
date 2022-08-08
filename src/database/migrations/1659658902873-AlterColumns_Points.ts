import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterColumnsPoints1659658902873 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE points DROP COLUMN altitude`);
        await queryRunner.query(`ALTER TABLE points RENAME COLUMN latitude TO y`);
        await queryRunner.query(`ALTER TABLE points RENAME COLUMN longitude TO x`);
        await queryRunner.query(`ALTER TABLE points RENAME COLUMN "isObstacle" TO "breakPoint"`);
        await queryRunner.query(`ALTER TABLE points ADD neighbor VARCHAR(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE ADD altitude TYPE REAL`);
        await queryRunner.query(`ALTER TABLE points RENAME COLUMN y TO latitude`);
        await queryRunner.query(`ALTER TABLE points RENAME COLUMN x TO longitude`);
        await queryRunner.query(`ALTER TABLE points RENAME COLUMN "breakPoint" TO "isObstacle"`);
        await queryRunner.query(`ALTER TABLE points DROP COLUMN neighbor`);
    }

}
