import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PhpSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M13 9h1.5v6H13v-2.5h-2V15H9.5V9H11v2h2V9zM8 9v4H4.5v2H3V9h5zm-1.5 1.5h-2v1h2v-1zm15-1.5v4H18v2h-1.5V9h5zM20 10.5h-2v1h2v-1z\"/>")
      .name("PhpSharp")
  }
}

export default PhpSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
