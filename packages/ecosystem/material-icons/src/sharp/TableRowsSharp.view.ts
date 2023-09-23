import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class TableRowsSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 8H3V4h18v4zm0 2H3v4h18v-4zm0 6H3v4h18v-4z\"/>")
      .name("TableRowsSharp")
  }
}

export default TableRowsSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
