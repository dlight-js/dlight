import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SquareTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5 5h14v14H5z\" opacity=\".3\"/><path d=\"M3 3v18h18V3H3zm16 16H5V5h14v14z\"/>")
      .name("SquareTwoTone")
  }
}

export default SquareTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
