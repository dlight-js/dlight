import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PriorityHighFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<circle cx=\"12\" cy=\"19\" r=\"2\"/><path d=\"M10 3h4v12h-4z\"/>")
      .name("PriorityHighFilled")
  }
}

export default PriorityHighFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
