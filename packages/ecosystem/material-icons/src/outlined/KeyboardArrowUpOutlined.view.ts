import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class KeyboardArrowUpOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z\"/>")
      .name("KeyboardArrowUpOutlined")
  }
}

export default KeyboardArrowUpOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
