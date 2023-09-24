import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class VideocamSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17 10.5V6H3v12h14v-4.5l4 4v-11l-4 4z\"/>")
      .name("VideocamSharp")
  }
}

export default VideocamSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
