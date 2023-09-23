import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SellOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m21.41 11.41-8.83-8.83c-.37-.37-.88-.58-1.41-.58H4c-1.1 0-2 .9-2 2v7.17c0 .53.21 1.04.59 1.41l8.83 8.83c.78.78 2.05.78 2.83 0l7.17-7.17c.78-.78.78-2.04-.01-2.83zM12.83 20 4 11.17V4h7.17L20 12.83 12.83 20z\"/><circle cx=\"6.5\" cy=\"6.5\" r=\"1.5\"/>")
      .name("SellOutlined")
  }
}

export default SellOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
