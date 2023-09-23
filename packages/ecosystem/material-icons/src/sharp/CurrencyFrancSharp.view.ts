import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class CurrencyFrancSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 5V3H7v13H5v2h2v3h2v-3h4v-2H9v-3h8v-2H9V5z\"/>")
      .name("CurrencyFrancSharp")
  }
}

export default CurrencyFrancSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
