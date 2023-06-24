import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1687615257203 implements MigrationInterface {
    name = 'Default1687615257203'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" ADD "admin" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "admin"`);
    }

}
