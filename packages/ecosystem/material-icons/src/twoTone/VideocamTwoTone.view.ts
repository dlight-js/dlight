import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class VideocamTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5 8h10v8H5z\" opacity=\".3\"/><path d=\"M17 7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4V7zm-2 9H5V8h10v8z\"/>")
      .name("VideocamTwoTone")
  }
}

export default VideocamTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
