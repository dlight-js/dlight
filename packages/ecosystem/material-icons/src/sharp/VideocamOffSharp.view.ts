import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class VideocamOffSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 16.61V6.5l-4 4V6h-6.61zM3.41 1.86 2 3.27 4.73 6H3v12h13.73l3 3 1.41-1.41z\"/>")
      .name("VideocamOffSharp")
  }
}

export default VideocamOffSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
