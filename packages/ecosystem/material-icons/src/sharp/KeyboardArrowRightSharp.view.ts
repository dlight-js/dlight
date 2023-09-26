import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class KeyboardArrowRightSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z\"/>")
      .name("KeyboardArrowRightSharp")
  }
}

export default KeyboardArrowRightSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
