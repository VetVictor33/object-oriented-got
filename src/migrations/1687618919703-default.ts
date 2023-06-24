import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1687618919703 implements MigrationInterface {
    name = 'Default1687618919703'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "monsters" ADD CONSTRAINT "UQ_15bbf5dc5555b28b07badf7e615" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "monsters" DROP CONSTRAINT "UQ_15bbf5dc5555b28b07badf7e615"`);
    }

}
