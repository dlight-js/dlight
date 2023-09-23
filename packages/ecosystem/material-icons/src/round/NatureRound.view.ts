import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class NatureRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M13 16.12c3.37-.4 6.01-3.19 6.16-6.64.17-3.87-3.02-7.25-6.89-7.31-3.92-.05-7.1 3.1-7.1 7A6.98 6.98 0 0 0 11 16.06V20H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1h-5v-3.88z\"/>")
      .name("NatureRound")
  }
}

export default NatureRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
