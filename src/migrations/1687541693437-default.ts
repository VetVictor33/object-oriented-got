import { MigrationInterface, QueryRunner } from "typeorm";

export class default1687541693437 implements MigrationInterface {
    name = 'default1687541693437'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" text NOT NULL, "email" text NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chars" ("id" SERIAL NOT NULL, "name" text NOT NULL, "profession" text NOT NULL, "user_id" integer, CONSTRAINT "UQ_b0bed26950f546cad92ca0e74b5" UNIQUE ("name"), CONSTRAINT "PK_1a61056ec3c83295dd644dd97c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "chars" ADD CONSTRAINT "FK_872f83777dd25dba8468bbf2db2" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chars" DROP CONSTRAINT "FK_872f83777dd25dba8468bbf2db2"`);
        await queryRunner.query(`DROP TABLE "chars"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
