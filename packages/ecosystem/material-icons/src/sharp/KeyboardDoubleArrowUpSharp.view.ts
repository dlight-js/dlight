import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class KeyboardDoubleArrowUpSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6 17.59 7.41 19 12 14.42 16.59 19 18 17.59l-6-6z\"/><path d=\"m6 11 1.41 1.41L12 7.83l4.59 4.58L18 11l-6-6z\"/>")
      .name("KeyboardDoubleArrowUpSharp")
  }
}

export default KeyboardDoubleArrowUpSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
