import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class VerticalShadesSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 19V3H4v16H2v2h20v-2h-2zm-10 0V5h4v14h-4z\"/>")
      .name("VerticalShadesSharp")
  }
}

export default VerticalShadesSharp as any as Typed<DLightIconType>
