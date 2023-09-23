import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ScienceRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20.54 17.73 15 11V5h1c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1s.45 1 1 1h1v6l-5.54 6.73c-.32.39-.46.83-.46 1.27.01 1.03.82 2 2 2h14c1.19 0 2-.97 2-2 0-.44-.14-.88-.46-1.27z\"/>")
      .name("ScienceRound")
  }
}

export default ScienceRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
