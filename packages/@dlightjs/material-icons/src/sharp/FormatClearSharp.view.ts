import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FormatClearSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 8V5H6.39l3 3h1.83l-.55 1.28 2.09 2.1L14.21 8zM3.41 4.86 2 6.27l6.97 6.97L6.5 19h3l1.57-3.66L16.73 21l1.41-1.41z\"/>")
      .name("FormatClearSharp")
  }
}

export default FormatClearSharp as any as Typed<DLightIconType>
