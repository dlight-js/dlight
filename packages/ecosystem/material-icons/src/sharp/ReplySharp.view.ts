import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ReplySharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z\"/>")
      .name("ReplySharp")
  }
}

export default ReplySharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
