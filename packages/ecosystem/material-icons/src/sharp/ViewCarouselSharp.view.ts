import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ViewCarouselSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M2 7h4v10H2V7zm5 12h10V5H7v14zM18 7h4v10h-4V7z\"/>")
      .name("ViewCarouselSharp")
  }
}

export default ViewCarouselSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
