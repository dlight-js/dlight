import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class CurrencyYuanFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M13.28 12H18v2h-5v7h-2v-7H6v-2h4.72L5 3h2.37L12 10.29 16.63 3H19z\"/>")
      .name("CurrencyYuanFilled")
  }
}

export default CurrencyYuanFilled as any as Typed<DLightIconType>
