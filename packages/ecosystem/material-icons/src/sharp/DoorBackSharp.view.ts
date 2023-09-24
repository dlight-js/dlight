import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class DoorBackSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 19V3H5v16H3v2h18v-2h-2zm-8-6H9v-2h2v2z\"/>")
      .name("DoorBackSharp")
  }
}

export default DoorBackSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
