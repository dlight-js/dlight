import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SwipeUpAltFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m13 5.83 1.59 1.59L16 6l-4-4-4 4 1.41 1.41L11 5.83v4.27a5 5 0 1 0 2 0V5.83z\"/>")
      .name("SwipeUpAltFilled")
  }
}

export default SwipeUpAltFilled as any as Typed<DLightIconType>
