import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class FormatListNumberedRtlTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M2 11h14v2H2zm16 6h2v.5h-1v1h1v.5h-2v1h3v-4h-3zm0-6h1.8L18 13.1v.9h3v-1h-1.8l1.8-2.1V10h-3zm2-3V4h-2v1h1v3zM2 17h14v2H2zM2 5h14v2H2z\"/>")
      .name("FormatListNumberedRtlTwoTone")
  }
}

export default FormatListNumberedRtlTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
