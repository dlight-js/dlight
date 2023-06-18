import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ViewCarouselTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M9 7h6v10H9z\" opacity=\".3\"/><path d=\"M2 7h4v10H2V7zm5 12h10V5H7v14zM9 7h6v10H9V7zm9 0h4v10h-4V7z\"/>")
      .name("ViewCarouselTwoTone")
  }
}

export default ViewCarouselTwoTone as any as Typed<DLightIconType>
