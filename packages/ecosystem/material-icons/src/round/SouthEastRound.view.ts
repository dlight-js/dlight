import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SouthEastRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 9c-.56 0-1 .45-1 1v5.59L6.12 4.7a.996.996 0 1 0-1.41 1.41L15.59 17H10c-.55 0-1 .45-1 1s.45 1 1 1h8c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1z\"/>")
      .name("SouthEastRound")
  }
}

export default SouthEastRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
