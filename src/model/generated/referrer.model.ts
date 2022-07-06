import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import {Plot} from "./plot.model"
import {Sale} from "./sale.model"

@Entity_()
export class Referrer {
  constructor(props?: Partial<Referrer>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @OneToMany_(() => Plot, e => e.referrer)
  referredPlots!: Plot[]

  @OneToMany_(() => Sale, e => e.referrer)
  referredSales!: Sale[]
}
