import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class Icon6kPlusSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M7.5 12.5h1V14h-1v-1.5zM21 3H3v18h18V3zm-11 7.5H7.5v1H10V15H6V9h4v1.5zm6 4.5h-1.75l-1.75-2.25V15H11V9h1.5v2.25L14.25 9H16l-2.25 3L16 15zm3-2.5h-1.5V14h-1v-1.5H15v-1h1.5V10h1v1.5H19v1z\"/>")
      .name("Icon6kPlusSharp")
  }
}

export default Icon6kPlusSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
