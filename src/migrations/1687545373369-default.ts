import { MigrationInterface, QueryRunner } from "typeorm";

export class default1687545373369 implements MigrationInterface {
    name = 'default1687545373369'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "name" TO "password"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "password" TO "name"`);
    }

}
