import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ForwardSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 8V4l8 8-8 8v-4H4V8h8z\"/>")
      .name("ForwardSharp")
  }
}

export default ForwardSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
