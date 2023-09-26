import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ShortcutTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m21 11-6-6v5H8c-2.76 0-5 2.24-5 5v4h2v-4c0-1.65 1.35-3 3-3h7v5l6-6z\"/>")
      .name("ShortcutTwoTone")
  }
}

export default ShortcutTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
