import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Buyer} from "./buyer.model"
import {Referrer} from "./referrer.model"
import {Sale} from "./sale.model"

@Entity_()
export class Plot {
  constructor(props?: Partial<Plot>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  plotId!: bigint

  @Index_()
  @ManyToOne_(() => Buyer, {nullable: false})
  buyer!: Buyer

  @Index_()
  @ManyToOne_(() => Referrer, {nullable: false})
  referrer!: Referrer

  @Index_()
  @ManyToOne_(() => Sale, {nullable: false})
  sale!: Sale
}
