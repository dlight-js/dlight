import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class KeyboardArrowUpFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z\"/>")
      .name("KeyboardArrowUpFilled")
  }
}

export default KeyboardArrowUpFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
