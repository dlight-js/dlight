import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class NavigationFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 2 4.5 20.29l.71.71L12 18l6.79 3 .71-.71z\"/>")
      .name("NavigationFilled")
  }
}

export default NavigationFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
