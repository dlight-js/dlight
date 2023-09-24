import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class DoorSlidingFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 19V5c0-1.1-.9-2-2-2h-5.25v16h-1.5V3H6c-1.1 0-2 .9-2 2v14H3v2h18v-2h-1zm-10-6H8v-2h2v2zm6 0h-2v-2h2v2z\"/>")
      .name("DoorSlidingFilled")
  }
}

export default DoorSlidingFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
