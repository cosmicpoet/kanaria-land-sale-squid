import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {Owner} from "./owner.model"
import {Purchase} from "./purchase.model"

@Entity_()
export class Plot {
  constructor(props?: Partial<Plot>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Index_()
  @ManyToOne_(() => Owner, {nullable: false})
  owner!: Owner

  @Index_()
  @ManyToOne_(() => Purchase, {nullable: false})
  purchase!: Purchase
}
