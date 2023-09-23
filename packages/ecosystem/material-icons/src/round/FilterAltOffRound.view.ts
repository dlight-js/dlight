import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FilterAltOffRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19.79 5.61A.998.998 0 0 0 19 4H6.83l7.97 7.97 4.99-6.36zm.7 14.88L3.51 3.51A.996.996 0 1 0 2.1 4.92L10 13v5c0 1.1.9 2 2 2s2-.9 2-2v-1.17l5.07 5.07c.39.39 1.02.39 1.41 0s.4-1.02.01-1.41z\"/>")
      .name("FilterAltOffRound")
  }
}

export default FilterAltOffRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
