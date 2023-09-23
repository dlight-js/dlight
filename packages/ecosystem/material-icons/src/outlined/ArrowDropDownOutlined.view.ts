import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ArrowDropDownOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m7 10 5 5 5-5H7z\"/>")
      .name("ArrowDropDownOutlined")
  }
}

export default ArrowDropDownOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
