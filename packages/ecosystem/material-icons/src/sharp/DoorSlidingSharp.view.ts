import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class DoorSlidingSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 19V3h-7.25v16h-1.5V3H4v16H3v2h18v-2h-1zm-10-6H8v-2h2v2zm6 0h-2v-2h2v2z\"/>")
      .name("DoorSlidingSharp")
  }
}

export default DoorSlidingSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
