import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class Icon10kSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M10 10.5h1.5v3H10v-3zM21 3H3v18h18V3zM7.5 15H6v-4.5H4.5V9h3v6zM13 9v6H8.5V9H13zm6 6h-1.75l-1.75-2.25V15H14V9h1.5v2.25L17.25 9H19l-2.25 3L19 15z\"/>")
      .name("Icon10kSharp")
  }
}

export default Icon10kSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
