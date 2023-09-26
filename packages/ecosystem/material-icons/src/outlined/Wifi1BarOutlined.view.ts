import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class Wifi1BarOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15.53 17.46 12 21l-3.53-3.54c.9-.9 2.15-1.46 3.53-1.46s2.63.56 3.53 1.46z\"/>")
      .name("Wifi1BarOutlined")
  }
}

export default Wifi1BarOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
