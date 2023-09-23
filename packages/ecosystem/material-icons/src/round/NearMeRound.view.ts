import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class NearMeRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18.75 3.94 4.07 10.08c-.83.35-.81 1.53.02 1.85L9.43 14a1 1 0 0 1 .57.57l2.06 5.33c.32.84 1.51.86 1.86.03l6.15-14.67c.33-.83-.5-1.66-1.32-1.32z\"/>")
      .name("NearMeRound")
  }
}

export default NearMeRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
