import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ThumbUpAltSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M14.17 1 7 8.18V21h12.31L23 12.4V8h-8.31l1.12-5.38zM1 9h4v12H1z\"/>")
      .name("ThumbUpAltSharp")
  }
}

export default ThumbUpAltSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
