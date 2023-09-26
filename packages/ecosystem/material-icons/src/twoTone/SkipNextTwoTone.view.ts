import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SkipNextTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M8 9.86v4.28L11.03 12z\" opacity=\".3\"/><path d=\"M14.5 12 6 6v12l8.5-6zM8 9.86 11.03 12 8 14.14V9.86zM16 6h2v12h-2z\"/>")
      .name("SkipNextTwoTone")
  }
}

export default SkipNextTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
