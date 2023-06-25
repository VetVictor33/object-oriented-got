import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1687694689888 implements MigrationInterface {
    name = 'Default1687694689888'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chars" ADD "experience" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chars" DROP COLUMN "experience"`);
    }

}
