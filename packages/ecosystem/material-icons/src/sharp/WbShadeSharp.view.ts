import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class WbShadeSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M14 12v2.5l5.5 5.5H22l-8-8zm0 8h3l-3-3v3zM8 4l-6 6h2v10h8V10h2L8 4zm1 10H7v-4h2v4z\"/>")
      .name("WbShadeSharp")
  }
}

export default WbShadeSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
