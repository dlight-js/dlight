import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class StopRound {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M8 6h8c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2z\"/>")
      .name("StopRound")
  }
}

export default StopRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
