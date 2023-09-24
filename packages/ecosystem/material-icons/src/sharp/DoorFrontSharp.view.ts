import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class DoorFrontSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 19V3H5v16H3v2h18v-2h-2zm-4-6h-2v-2h2v2z\"/>")
      .name("DoorFrontSharp")
  }
}

export default DoorFrontSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
