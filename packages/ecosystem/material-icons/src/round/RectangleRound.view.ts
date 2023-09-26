import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class RectangleRound {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2z\"/>")
      .name("RectangleRound")
  }
}

export default RectangleRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
