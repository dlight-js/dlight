import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class Icon4kSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 3H3v18h18V3zm-9 10.51h-1V15H9.5v-1.5h-3V9H8v3h1.5V9H11v3h1v1.51zM18.2 15h-1.7l-2-3v3H13V9h1.5v3l2-3h1.7l-2 3 2 3z\"/>")
      .name("Icon4kSharp")
  }
}

export default Icon4kSharp as any as Typed<DLightIconType>
