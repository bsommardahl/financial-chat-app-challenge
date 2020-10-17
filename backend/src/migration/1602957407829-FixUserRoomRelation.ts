import {MigrationInterface, QueryRunner} from "typeorm";

export class FixUserRoomRelation1602957407829 implements MigrationInterface {
    name = 'FixUserRoomRelation1602957407829'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "roomId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_33bc07e7cd5c7e8bb7ac570f1ed" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_33bc07e7cd5c7e8bb7ac570f1ed"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roomId"`);
    }

}
