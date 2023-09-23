import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SouthWestRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15 18c0-.56-.45-1-1-1H8.41L19.3 6.11a.996.996 0 1 0-1.41-1.41L7 15.59V10c0-.55-.45-1-1-1s-1 .45-1 1v8c0 .55.45 1 1 1h8c.55 0 1-.45 1-1z\"/>")
      .name("SouthWestRound")
  }
}

export default SouthWestRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
