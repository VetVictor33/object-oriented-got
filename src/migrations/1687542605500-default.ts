import { MigrationInterface, QueryRunner } from "typeorm";

export class default1687542605500 implements MigrationInterface {
    name = 'default1687542605500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "monsters" ("id" SERIAL NOT NULL, "dificulty" integer NOT NULL, CONSTRAINT "PK_54abad06b2131c35078519e9e19" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "monsters"`);
    }

}
