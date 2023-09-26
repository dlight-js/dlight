import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class TourSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 4H7V2H5v20h2v-8h14l-2-5 2-5zm-6 5c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z\"/>")
      .name("TourSharp")
  }
}

export default TourSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
