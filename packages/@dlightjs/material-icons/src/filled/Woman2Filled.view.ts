import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class Woman2Filled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M13.94 8.31C13.62 7.52 12.85 7 12 7s-1.62.52-1.94 1.31L7 16h3.5v6h3v-6H17l-3.06-7.69z\"/><circle cx=\"12\" cy=\"4\" r=\"2\"/>")
      .name("Woman2Filled")
  }
}

export default Woman2Filled as any as Typed<DLightIconType>
