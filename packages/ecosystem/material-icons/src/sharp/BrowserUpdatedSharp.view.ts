import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class BrowserUpdatedSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 13v5h-5l1 1v2H6v-2l1-1H2V3h10v2H4v11h16v-3h2zm-7 2-5-5h4V3h2v7h4l-5 5z\"/>")
      .name("BrowserUpdatedSharp")
  }
}

export default BrowserUpdatedSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
