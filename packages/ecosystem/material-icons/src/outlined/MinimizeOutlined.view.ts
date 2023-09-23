import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class MinimizeOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6 19h12v2H6v-2z\"/>")
      .name("MinimizeOutlined")
  }
}

export default MinimizeOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
