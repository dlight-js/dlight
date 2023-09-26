import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class KeyboardDoubleArrowLeftSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17.59 18 19 16.59 14.42 12 19 7.41 17.59 6l-6 6z\"/><path d=\"m11 18 1.41-1.41L7.83 12l4.58-4.59L11 6l-6 6z\"/>")
      .name("KeyboardDoubleArrowLeftSharp")
  }
}

export default KeyboardDoubleArrowLeftSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
