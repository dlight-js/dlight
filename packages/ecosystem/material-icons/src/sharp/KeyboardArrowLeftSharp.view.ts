import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class KeyboardArrowLeftSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z\"/>")
      .name("KeyboardArrowLeftSharp")
  }
}

export default KeyboardArrowLeftSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
