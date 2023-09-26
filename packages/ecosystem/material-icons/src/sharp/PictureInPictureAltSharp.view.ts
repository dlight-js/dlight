import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class PictureInPictureAltSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 11h-8v6h8v-6zm4 10V3H1v18h22zm-2-1.98H3V4.97h18v14.05z\"/>")
      .name("PictureInPictureAltSharp")
  }
}

export default PictureInPictureAltSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
