import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class TurnSlightRightSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12.34 6V4H18v5.66h-2V7.41l-5 5V20H9v-8.41L14.59 6z\"/>")
      .name("TurnSlightRightSharp")
  }
}

export default TurnSlightRightSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
