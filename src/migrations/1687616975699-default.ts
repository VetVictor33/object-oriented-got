import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1687616975699 implements MigrationInterface {
    name = 'Default1687616975699'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "monsters" ADD "name" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "monsters" DROP COLUMN "name"`);
    }

}
