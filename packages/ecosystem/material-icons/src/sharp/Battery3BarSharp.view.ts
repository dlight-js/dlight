import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class Battery3BarSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17 4v18H7V4h3V2h4v2h3zm-2 2H9v8h6V6z\"/>")
      .name("Battery3BarSharp")
  }
}

export default Battery3BarSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
