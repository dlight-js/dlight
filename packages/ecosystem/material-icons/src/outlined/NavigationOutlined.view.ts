import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class NavigationOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m12 7.27 4.28 10.43-3.47-1.53-.81-.36-.81.36-3.47 1.53L12 7.27M12 2 4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z\"/>")
      .name("NavigationOutlined")
  }
}

export default NavigationOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
