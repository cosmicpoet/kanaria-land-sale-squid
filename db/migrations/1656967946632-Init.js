module.exports = class Init1656967946632 {
  name = 'Init1656967946632'

  async up(db) {
    await db.query(`CREATE TABLE "purchase" ("id" character varying NOT NULL, "bought_with_credits" boolean NOT NULL, "timestamp" numeric NOT NULL, "block" integer NOT NULL, "buyer_id" character varying NOT NULL, "referrer_id" character varying, CONSTRAINT "PK_86cc2ebeb9e17fc9c0774b05f69" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_68e5815290fd0e71e36093eb14" ON "purchase" ("buyer_id") `)
    await db.query(`CREATE INDEX "IDX_531940317f2e1eaf9892a7ecad" ON "purchase" ("referrer_id") `)
    await db.query(`CREATE TABLE "plot" ("id" character varying NOT NULL, "owner_id" character varying NOT NULL, "purchase_id" character varying NOT NULL, CONSTRAINT "PK_7c22bdc3280a3a5610c63159883" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_ec89184fd249370e4c5c41d3ab" ON "plot" ("owner_id") `)
    await db.query(`CREATE INDEX "IDX_9a84e92ae7f20d5da6a62a11da" ON "plot" ("purchase_id") `)
    await db.query(`CREATE TABLE "owner" ("id" character varying NOT NULL, CONSTRAINT "PK_8e86b6b9f94aece7d12d465dc0c" PRIMARY KEY ("id"))`)
    await db.query(`ALTER TABLE "purchase" ADD CONSTRAINT "FK_68e5815290fd0e71e36093eb14c" FOREIGN KEY ("buyer_id") REFERENCES "owner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "purchase" ADD CONSTRAINT "FK_531940317f2e1eaf9892a7ecad1" FOREIGN KEY ("referrer_id") REFERENCES "owner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "plot" ADD CONSTRAINT "FK_ec89184fd249370e4c5c41d3abe" FOREIGN KEY ("owner_id") REFERENCES "owner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "plot" ADD CONSTRAINT "FK_9a84e92ae7f20d5da6a62a11da6" FOREIGN KEY ("purchase_id") REFERENCES "purchase"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "purchase"`)
    await db.query(`DROP INDEX "public"."IDX_68e5815290fd0e71e36093eb14"`)
    await db.query(`DROP INDEX "public"."IDX_531940317f2e1eaf9892a7ecad"`)
    await db.query(`DROP TABLE "plot"`)
    await db.query(`DROP INDEX "public"."IDX_ec89184fd249370e4c5c41d3ab"`)
    await db.query(`DROP INDEX "public"."IDX_9a84e92ae7f20d5da6a62a11da"`)
    await db.query(`DROP TABLE "owner"`)
    await db.query(`ALTER TABLE "purchase" DROP CONSTRAINT "FK_68e5815290fd0e71e36093eb14c"`)
    await db.query(`ALTER TABLE "purchase" DROP CONSTRAINT "FK_531940317f2e1eaf9892a7ecad1"`)
    await db.query(`ALTER TABLE "plot" DROP CONSTRAINT "FK_ec89184fd249370e4c5c41d3abe"`)
    await db.query(`ALTER TABLE "plot" DROP CONSTRAINT "FK_9a84e92ae7f20d5da6a62a11da6"`)
  }
}
