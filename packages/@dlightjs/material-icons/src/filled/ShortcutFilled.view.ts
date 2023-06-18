import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ShortcutFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m21 11-6-6v5H8c-2.76 0-5 2.24-5 5v4h2v-4c0-1.65 1.35-3 3-3h7v5l6-6z\"/>")
      .name("ShortcutFilled")
  }
}

export default ShortcutFilled as any as Typed<DLightIconType>
