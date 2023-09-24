import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class KeyboardTabSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M11.59 7.41 15.17 11H1v2h14.17l-3.59 3.59L13 18l6-6-6-6-1.41 1.41zM20 6v12h2V6h-2z\"/>")
      .name("KeyboardTabSharp")
  }
}

export default KeyboardTabSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
