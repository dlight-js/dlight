import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class DiscountSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12.79 21 3 11.21v2.83l9.79 9.79 9.04-9.04-1.42-1.41z\"/><path d=\"m3 9.04 9.79 9.79 9.04-9.04L12.04 0H3v9.04zM7.25 3a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z\"/>")
      .name("DiscountSharp")
  }
}

export default DiscountSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
