import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class CurrencyFrancFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 5V3H7v13H5v2h2v3h2v-3h4v-2H9v-3h8v-2H9V5z\"/>")
      .name("CurrencyFrancFilled")
  }
}

export default CurrencyFrancFilled as any as Typed<DLightIconType>
