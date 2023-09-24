import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class EventSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17 13h-5v5h5v-5zM16 2v2H8V2H6v2H3.01L3 22h18V4h-3V2h-2zm3 18H5V9h14v11z\"/>")
      .name("EventSharp")
  }
}

export default EventSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
