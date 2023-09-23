import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FormatOverlineRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5 4c0-.55.45-1 1-1h12c.55 0 1 .45 1 1s-.45 1-1 1H6c-.55 0-1-.45-1-1zm7 3c-3.87 0-7 3.13-7 7s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7zm0 11.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 9.5 12 9.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5z\"/>")
      .name("FormatOverlineRound")
  }
}

export default FormatOverlineRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
