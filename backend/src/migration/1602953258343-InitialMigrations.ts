import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigrations1602953258343 implements MigrationInterface {
    name = 'InitialMigrations1602953258343'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "socketId" character varying(300) NOT NULL, "username" character varying(300) NOT NULL, CONSTRAINT "UQ_ae0dad68398135d4559d63b3882" UNIQUE ("socketId"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rooms" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_0368a2d7c215f2d0458a54933f2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "messages" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "message" text NOT NULL, "userId" integer, "roomId" integer, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rooms_users_users" ("roomsId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_ec0e74b500eaad3d92f5179fb01" PRIMARY KEY ("roomsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cbe951142bc45a33a744256516" ON "rooms_users_users" ("roomsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6b3c5f4bbfb29a84a57e442af5" ON "rooms_users_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_4838cd4fc48a6ff2d4aa01aa646" FOREIGN KEY ("userId") REFERENCES "messages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_aaa8a6effc7bd20a1172d3a3bc8" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rooms_users_users" ADD CONSTRAINT "FK_cbe951142bc45a33a744256516d" FOREIGN KEY ("roomsId") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rooms_users_users" ADD CONSTRAINT "FK_6b3c5f4bbfb29a84a57e442af54" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms_users_users" DROP CONSTRAINT "FK_6b3c5f4bbfb29a84a57e442af54"`);
        await queryRunner.query(`ALTER TABLE "rooms_users_users" DROP CONSTRAINT "FK_cbe951142bc45a33a744256516d"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_aaa8a6effc7bd20a1172d3a3bc8"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_4838cd4fc48a6ff2d4aa01aa646"`);
        await queryRunner.query(`DROP INDEX "IDX_6b3c5f4bbfb29a84a57e442af5"`);
        await queryRunner.query(`DROP INDEX "IDX_cbe951142bc45a33a744256516"`);
        await queryRunner.query(`DROP TABLE "rooms_users_users"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TABLE "rooms"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
