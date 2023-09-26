import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ViewCarouselTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M9 7h6v10H9z\" opacity=\".3\"/><path d=\"M2 7h4v10H2V7zm5 12h10V5H7v14zM9 7h6v10H9V7zm9 0h4v10h-4V7z\"/>")
      .name("ViewCarouselTwoTone")
  }
}

export default ViewCarouselTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
