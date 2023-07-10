import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class Brightness1Filled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<circle cx=\"12\" cy=\"12\" r=\"10\"/>")
      .name("Brightness1Filled")
  }
}

export default Brightness1Filled as any as Typed<DLightIconType>
