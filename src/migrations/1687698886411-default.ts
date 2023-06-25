import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1687698886411 implements MigrationInterface {
    name = 'Default1687698886411'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chars" DROP COLUMN "experience"`);
        await queryRunner.query(`ALTER TABLE "chars" ADD "experience" double precision NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chars" DROP COLUMN "experience"`);
        await queryRunner.query(`ALTER TABLE "chars" ADD "experience" integer NOT NULL DEFAULT '0'`);
    }

}
