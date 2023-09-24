import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ViewTimelineSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 3H3v18h18V3zm-9 14H6v-2h6v2zm3-4H9v-2h6v2zm3-4h-6V7h6v2z\"/>")
      .name("ViewTimelineSharp")
  }
}

export default ViewTimelineSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
