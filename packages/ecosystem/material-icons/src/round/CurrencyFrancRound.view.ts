import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class CurrencyFrancRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 4c0-.55-.45-1-1-1H8c-.55 0-1 .45-1 1v12H6c-.55 0-1 .45-1 1s.45 1 1 1h1v2c0 .55.45 1 1 1s1-.45 1-1v-2h3c.55 0 1-.45 1-1s-.45-1-1-1H9v-3h7c.55 0 1-.45 1-1s-.45-1-1-1H9V5h8c.55 0 1-.45 1-1z\"/>")
      .name("CurrencyFrancRound")
  }
}

export default CurrencyFrancRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
