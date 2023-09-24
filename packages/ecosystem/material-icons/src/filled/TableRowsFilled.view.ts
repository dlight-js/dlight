import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class TableRowsFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 8H3V4h18v4zm0 2H3v4h18v-4zm0 6H3v4h18v-4z\"/>")
      .name("TableRowsFilled")
  }
}

export default TableRowsFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
