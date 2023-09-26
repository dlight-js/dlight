import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class KeyboardBackspaceFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z\"/>")
      .name("KeyboardBackspaceFilled")
  }
}

export default KeyboardBackspaceFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
