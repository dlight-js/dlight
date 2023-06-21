import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class Battery4BarSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17 4v18H7V4h3V2h4v2h3zm-2 2H9v6h6V6z\"/>")
      .name("Battery4BarSharp")
  }
}

export default Battery4BarSharp as any as Typed<DLightIconType>
