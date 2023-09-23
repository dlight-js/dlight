import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ArrowDropUpOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m7 14 5-5 5 5H7z\"/>")
      .name("ArrowDropUpOutlined")
  }
}

export default ArrowDropUpOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
