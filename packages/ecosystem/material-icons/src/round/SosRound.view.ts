import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SosRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M13.5 7h-3c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h3c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8h-3V9h3v6zM3 9v2h2c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2H2c-.55 0-1-.45-1-1s.45-1 1-1h3v-2H3c-1.1 0-2-.9-2-2V9c0-1.1.9-2 2-2h3c.55 0 1 .45 1 1s-.45 1-1 1H3zm16 0v2h2c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2h-3c-.55 0-1-.45-1-1s.45-1 1-1h3v-2h-2c-1.1 0-2-.9-2-2V9c0-1.1.9-2 2-2h3c.55 0 1 .45 1 1s-.45 1-1 1h-3z\"/>")
      .name("SosRound")
  }
}

export default SosRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
