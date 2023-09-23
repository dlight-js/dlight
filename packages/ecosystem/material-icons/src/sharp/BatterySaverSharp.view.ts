import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class BatterySaverSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17 4h-3V2h-4v2H7v18h10V4zm-2 10h-2v2h-2v-2H9v-2h2v-2h2v2h2v2z\"/>")
      .name("BatterySaverSharp")
  }
}

export default BatterySaverSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
