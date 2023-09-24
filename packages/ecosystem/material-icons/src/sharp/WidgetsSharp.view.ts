import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class WidgetsSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M13 13v8h8v-8h-8zM3 21h8v-8H3v8zM3 3v8h8V3H3zm13.66-1.31L11 7.34 16.66 13l5.66-5.66-5.66-5.65z\"/>")
      .name("WidgetsSharp")
  }
}

export default WidgetsSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
