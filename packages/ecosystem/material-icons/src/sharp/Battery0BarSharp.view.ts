import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class Battery0BarSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17 4v18H7V4h3V2h4v2h3zm-2 2H9v14h6V6z\"/>")
      .name("Battery0BarSharp")
  }
}

export default Battery0BarSharp as any as Typed<DLightIconType>
