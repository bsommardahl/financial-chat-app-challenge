import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveUsernameUniqueness1602962297260 implements MigrationInterface {
    name = 'RemoveUsernameUniqueness1602962297260'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username")`);
    }

}
