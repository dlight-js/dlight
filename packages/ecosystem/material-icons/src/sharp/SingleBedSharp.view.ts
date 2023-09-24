import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SingleBedSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 10V5H6v5H4v7h1.33L6 19h1l.67-2h8.67l.66 2h1l.67-2H20v-7h-2zm-7 0H8V7h3v3zm5 0h-3V7h3v3z\"/>")
      .name("SingleBedSharp")
  }
}

export default SingleBedSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
