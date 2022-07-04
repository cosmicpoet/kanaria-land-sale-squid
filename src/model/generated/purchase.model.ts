import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Plot} from "./plot.model"
import {Owner} from "./owner.model"

@Entity_()
export class Purchase {
  constructor(props?: Partial<Purchase>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @OneToMany_(() => Plot, e => e.purchase)
  plots!: Plot[]

  @Index_()
  @ManyToOne_(() => Owner, {nullable: false})
  buyer!: Owner

  @Index_()
  @ManyToOne_(() => Owner, {nullable: true})
  referrer!: Owner | undefined | null

  @Column_("bool", {nullable: false})
  boughtWithCredits!: boolean

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  timestamp!: bigint

  @Column_("int4", {nullable: false})
  block!: number
}
