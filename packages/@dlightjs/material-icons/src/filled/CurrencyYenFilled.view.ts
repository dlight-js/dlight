import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class CurrencyYenFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M13.92 11H18v2h-5v2h5v2h-5v4h-2v-4H6v-2h5v-2H6v-2h4.08L5 3h2.37L12 10.29 16.63 3H19z\"/>")
      .name("CurrencyYenFilled")
  }
}

export default CurrencyYenFilled as any as Typed<DLightIconType>
