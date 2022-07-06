import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Plot} from "./plot.model"
import {Buyer} from "./buyer.model"
import {Referrer} from "./referrer.model"

@Entity_()
export class Sale {
  constructor(props?: Partial<Sale>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @OneToMany_(() => Plot, e => e.sale)
  plots!: Plot[]

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  amount!: bigint

  @Index_()
  @ManyToOne_(() => Buyer, {nullable: false})
  buyer!: Buyer

  @Index_()
  @ManyToOne_(() => Referrer, {nullable: false})
  referrer!: Referrer

  @Column_("bool", {nullable: false})
  boughtWithCredits!: boolean

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  timestamp!: bigint

  @Column_("int4", {nullable: false})
  block!: number
}
