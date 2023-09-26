import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ChairAltSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16 10h3V3H5v7h3v2H5v9h2v-3h10v3h2v-9h-3v-2zM7 8V5h10v3H7zm10 8H7v-2h10v2zm-3-4h-4v-2h4v2z\"/>")
      .name("ChairAltSharp")
  }
}

export default ChairAltSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
