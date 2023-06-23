import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1687549893057 implements MigrationInterface {
    name = 'Default1687549893057'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "accounts" ("id" SERIAL NOT NULL, "email" text NOT NULL, "password" text NOT NULL, CONSTRAINT "UQ_ee66de6cdc53993296d1ceb8aa0" UNIQUE ("email"), CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "itens" ("id" SERIAL NOT NULL, "value" integer NOT NULL, "description" text NOT NULL, "owner_id" integer, CONSTRAINT "PK_b090d1e0e0721a15b3f9f0c6f0e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chars" ("id" SERIAL NOT NULL, "name" text NOT NULL, "profession" text NOT NULL, "account_id" integer, CONSTRAINT "UQ_b0bed26950f546cad92ca0e74b5" UNIQUE ("name"), CONSTRAINT "PK_1a61056ec3c83295dd644dd97c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "monsters" ("id" SERIAL NOT NULL, "dificulty" integer NOT NULL, CONSTRAINT "PK_54abad06b2131c35078519e9e19" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "itens" ADD CONSTRAINT "FK_950899f9a2dd3dbe5db1fd59708" FOREIGN KEY ("owner_id") REFERENCES "chars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chars" ADD CONSTRAINT "FK_d1a0a33a6306447b3744000909c" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chars" DROP CONSTRAINT "FK_d1a0a33a6306447b3744000909c"`);
        await queryRunner.query(`ALTER TABLE "itens" DROP CONSTRAINT "FK_950899f9a2dd3dbe5db1fd59708"`);
        await queryRunner.query(`DROP TABLE "monsters"`);
        await queryRunner.query(`DROP TABLE "chars"`);
        await queryRunner.query(`DROP TABLE "itens"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
    }

}
