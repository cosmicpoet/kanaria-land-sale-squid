import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import {Plot} from "./plot.model"
import {Sale} from "./sale.model"

@Entity_()
export class Buyer {
  constructor(props?: Partial<Buyer>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @OneToMany_(() => Plot, e => e.buyer)
  ownedPlots!: Plot[]

  @OneToMany_(() => Sale, e => e.buyer)
  sales!: Sale[]
}
