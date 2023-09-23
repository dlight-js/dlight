import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class KeyboardDoubleArrowDownOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 6.41 16.59 5 12 9.58 7.41 5 6 6.41l6 6z\"/><path d=\"m18 13-1.41-1.41L12 16.17l-4.59-4.58L6 13l6 6z\"/>")
      .name("KeyboardDoubleArrowDownOutlined")
  }
}

export default KeyboardDoubleArrowDownOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
