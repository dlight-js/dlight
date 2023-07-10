import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class KeyboardDoubleArrowUpOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6 17.59 7.41 19 12 14.42 16.59 19 18 17.59l-6-6z\"/><path d=\"m6 11 1.41 1.41L12 7.83l4.59 4.58L18 11l-6-6z\"/>")
      .name("KeyboardDoubleArrowUpOutlined")
  }
}

export default KeyboardDoubleArrowUpOutlined as any as Typed<DLightIconType>
