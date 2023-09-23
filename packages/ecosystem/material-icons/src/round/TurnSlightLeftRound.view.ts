import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class TurnSlightLeftRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M11.66 5c0-.55-.45-1-1-1H7c-.55 0-1 .45-1 1v3.66c0 .55.45 1 1 1s1-.45 1-1V7.41l5 5V19c0 .55.45 1 1 1s1-.45 1-1v-6.58c0-.53-.21-1.04-.59-1.41l-5-5h1.24A1.02 1.02 0 0 0 11.66 5z\"/>")
      .name("TurnSlightLeftRound")
  }
}

export default TurnSlightLeftRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
