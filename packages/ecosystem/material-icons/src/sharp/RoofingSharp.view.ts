import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class RoofingSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M13 18h-2v-2h2v2zm2-4H9v6h6v-6zm4-4.7V4h-3v2.6L12 3 2 12h3l7-6.31L19 12h3l-3-2.7z\"/>")
      .name("RoofingSharp")
  }
}

export default RoofingSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
