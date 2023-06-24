import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1687567998748 implements MigrationInterface {
    name = 'Default1687567998748'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chars" ADD "level" integer NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chars" DROP COLUMN "level"`);
    }

}
