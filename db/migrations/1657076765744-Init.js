module.exports = class Init1657076765744 {
  name = 'Init1657076765744'

  async up(db) {
    await db.query(`CREATE TABLE "sale" ("id" character varying NOT NULL, "tx_hash" text NOT NULL, "amount" numeric NOT NULL, "bought_with_credits" boolean NOT NULL, "timestamp" numeric NOT NULL, "block" integer NOT NULL, "buyer_id" character varying NOT NULL, "referrer_id" character varying NOT NULL, CONSTRAINT "PK_d03891c457cbcd22974732b5de2" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_2296c3d55ec8891ef2be15d341" ON "sale" ("buyer_id") `)
    await db.query(`CREATE INDEX "IDX_21dfbb45047889bfac1afe4578" ON "sale" ("referrer_id") `)
    await db.query(`CREATE TABLE "referrer" ("id" character varying NOT NULL, CONSTRAINT "PK_6af2ce99a84db81dbb3622a7335" PRIMARY KEY ("id"))`)
    await db.query(`CREATE TABLE "plot" ("id" character varying NOT NULL, "plot_id" numeric NOT NULL, "buyer_id" character varying NOT NULL, "referrer_id" character varying NOT NULL, "sale_id" character varying NOT NULL, CONSTRAINT "PK_7c22bdc3280a3a5610c63159883" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_941e6f8e227f6123eca097dd7d" ON "plot" ("buyer_id") `)
    await db.query(`CREATE INDEX "IDX_ac0a37eb18459786d1d72c58bf" ON "plot" ("referrer_id") `)
    await db.query(`CREATE INDEX "IDX_08cb1005b49aba2c3a6375bc19" ON "plot" ("sale_id") `)
    await db.query(`CREATE TABLE "buyer" ("id" character varying NOT NULL, CONSTRAINT "PK_0480fc3c7289846a31b8e1bc503" PRIMARY KEY ("id"))`)
    await db.query(`ALTER TABLE "sale" ADD CONSTRAINT "FK_2296c3d55ec8891ef2be15d341d" FOREIGN KEY ("buyer_id") REFERENCES "buyer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "sale" ADD CONSTRAINT "FK_21dfbb45047889bfac1afe4578c" FOREIGN KEY ("referrer_id") REFERENCES "referrer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "plot" ADD CONSTRAINT "FK_941e6f8e227f6123eca097dd7d9" FOREIGN KEY ("buyer_id") REFERENCES "buyer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "plot" ADD CONSTRAINT "FK_ac0a37eb18459786d1d72c58bfd" FOREIGN KEY ("referrer_id") REFERENCES "referrer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "plot" ADD CONSTRAINT "FK_08cb1005b49aba2c3a6375bc19b" FOREIGN KEY ("sale_id") REFERENCES "sale"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "sale"`)
    await db.query(`DROP INDEX "public"."IDX_2296c3d55ec8891ef2be15d341"`)
    await db.query(`DROP INDEX "public"."IDX_21dfbb45047889bfac1afe4578"`)
    await db.query(`DROP TABLE "referrer"`)
    await db.query(`DROP TABLE "plot"`)
    await db.query(`DROP INDEX "public"."IDX_941e6f8e227f6123eca097dd7d"`)
    await db.query(`DROP INDEX "public"."IDX_ac0a37eb18459786d1d72c58bf"`)
    await db.query(`DROP INDEX "public"."IDX_08cb1005b49aba2c3a6375bc19"`)
    await db.query(`DROP TABLE "buyer"`)
    await db.query(`ALTER TABLE "sale" DROP CONSTRAINT "FK_2296c3d55ec8891ef2be15d341d"`)
    await db.query(`ALTER TABLE "sale" DROP CONSTRAINT "FK_21dfbb45047889bfac1afe4578c"`)
    await db.query(`ALTER TABLE "plot" DROP CONSTRAINT "FK_941e6f8e227f6123eca097dd7d9"`)
    await db.query(`ALTER TABLE "plot" DROP CONSTRAINT "FK_ac0a37eb18459786d1d72c58bfd"`)
    await db.query(`ALTER TABLE "plot" DROP CONSTRAINT "FK_08cb1005b49aba2c3a6375bc19b"`)
  }
}
