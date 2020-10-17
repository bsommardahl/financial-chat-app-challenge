import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRoomNameColumn1602955646651 implements MigrationInterface {
    name = 'AddRoomNameColumn1602955646651'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms" ADD "roomName" character varying(300) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rooms" ADD CONSTRAINT "UQ_4e1667c335451873f04a5741564" UNIQUE ("roomName")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms" DROP CONSTRAINT "UQ_4e1667c335451873f04a5741564"`);
        await queryRunner.query(`ALTER TABLE "rooms" DROP COLUMN "roomName"`);
    }

}
