import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FastForwardFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m4 18 8.5-6L4 6v12zm9-12v12l8.5-6L13 6z\"/>")
      .name("FastForwardFilled")
  }
}

export default FastForwardFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
