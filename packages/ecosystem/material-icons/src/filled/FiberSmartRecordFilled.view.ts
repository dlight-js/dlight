import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class FiberSmartRecordFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<circle cx=\"9\" cy=\"12\" r=\"8\"/><path d=\"M17 4.26v2.09a5.99 5.99 0 0 1 0 11.3v2.09c3.45-.89 6-4.01 6-7.74s-2.55-6.85-6-7.74z\"/>")
      .name("FiberSmartRecordFilled")
  }
}

export default FiberSmartRecordFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
