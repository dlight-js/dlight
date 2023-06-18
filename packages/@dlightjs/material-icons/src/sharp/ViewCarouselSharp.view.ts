import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ViewCarouselSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M2 7h4v10H2V7zm5 12h10V5H7v14zM18 7h4v10h-4V7z\"/>")
      .name("ViewCarouselSharp")
  }
}

export default ViewCarouselSharp as any as Typed<DLightIconType>
