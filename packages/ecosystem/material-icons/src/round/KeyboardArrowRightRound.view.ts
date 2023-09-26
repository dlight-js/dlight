import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class KeyboardArrowRightRound {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M9.29 15.88 13.17 12 9.29 8.12a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42z\"/>")
      .name("KeyboardArrowRightRound")
  }
}

export default KeyboardArrowRightRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
