import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SkipPreviousTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16 14.14V9.86L12.97 12z\" opacity=\".3\"/><path d=\"M6 6h2v12H6zm12 12V6l-8.5 6 8.5 6zm-2-3.86L12.97 12 16 9.86v4.28z\"/>")
      .name("SkipPreviousTwoTone")
  }
}

export default SkipPreviousTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
