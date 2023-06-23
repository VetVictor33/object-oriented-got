import { MigrationInterface, QueryRunner } from "typeorm";

export class default1687543888963 implements MigrationInterface {
    name = 'default1687543888963'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "itens" ("id" SERIAL NOT NULL, "value" integer NOT NULL, "description" text NOT NULL, "owner_id" integer, CONSTRAINT "PK_b090d1e0e0721a15b3f9f0c6f0e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "itens" ADD CONSTRAINT "FK_950899f9a2dd3dbe5db1fd59708" FOREIGN KEY ("owner_id") REFERENCES "chars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "itens" DROP CONSTRAINT "FK_950899f9a2dd3dbe5db1fd59708"`);
        await queryRunner.query(`DROP TABLE "itens"`);
    }

}
