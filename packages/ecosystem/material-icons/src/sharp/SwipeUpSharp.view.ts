import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SwipeUpSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M2.06 5.56 1 4.5 4.5 1 8 4.5 6.94 5.56 5.32 3.94a10.457 10.457 0 0 0 1.88 8.99L6.13 14A11.974 11.974 0 0 1 3.5 6.5c0-.92.1-1.82.3-2.68L2.06 5.56zm19.65 5.62 2.09 7.39-8.23 3.65-6.84-2.85.61-1.62 3.8-.75-4.35-9.83c-.34-.76 0-1.64.76-1.98.76-.34 1.64 0 1.98.76l2.43 5.49 1.26-.56 6.49.3z\"/>")
      .name("SwipeUpSharp")
  }
}

export default SwipeUpSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
