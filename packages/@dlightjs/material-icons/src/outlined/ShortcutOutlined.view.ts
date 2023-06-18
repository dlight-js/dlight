import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ShortcutOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m15 5-1.41 1.41L15 7.83 17.17 10H8c-2.76 0-5 2.24-5 5v4h2v-4c0-1.65 1.35-3 3-3h9.17L15 14.17l-1.41 1.41L15 17l6-6-6-6z\"/>")
      .name("ShortcutOutlined")
  }
}

export default ShortcutOutlined as any as Typed<DLightIconType>
