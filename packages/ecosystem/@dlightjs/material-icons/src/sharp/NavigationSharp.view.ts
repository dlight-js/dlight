import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class NavigationSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 2 4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z\"/>")
      .name("NavigationSharp")
  }
}

export default NavigationSharp as any as Typed<DLightIconType>
