import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ShortTextFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M4 9h16v2H4V9zm0 4h10v2H4v-2z\"/>")
      .name("ShortTextFilled")
  }
}

export default ShortTextFilled as any as Typed<DLightIconType>
