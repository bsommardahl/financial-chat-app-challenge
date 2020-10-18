import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserIsOnline1602989760712 implements MigrationInterface {
    name = 'AddUserIsOnline1602989760712'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "isOnline" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isOnline"`);
    }

}
