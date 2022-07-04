import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
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

  @Index_()
  @ManyToOne_(() => Plot, {nullable: false})
  plot!: Plot

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

  @Column_("integer", {nullable: false})
  block!: number

  @Column_("text", {nullable: false})
  transactionHash!: string
}
