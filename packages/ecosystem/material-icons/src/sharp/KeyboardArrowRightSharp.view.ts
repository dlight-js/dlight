import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class KeyboardArrowRightSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z\"/>")
      .name("KeyboardArrowRightSharp")
  }
}

export default KeyboardArrowRightSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
