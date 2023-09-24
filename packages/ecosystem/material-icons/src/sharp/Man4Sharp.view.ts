import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class Man4Sharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M7.96 7 10 22h4l2.04-15z\"/><circle cx=\"12\" cy=\"4\" r=\"2\"/>")
      .name("Man4Sharp")
  }
}

export default Man4Sharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
