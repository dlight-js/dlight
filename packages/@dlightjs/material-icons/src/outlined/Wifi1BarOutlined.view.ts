import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class Wifi1BarOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15.53 17.46 12 21l-3.53-3.54c.9-.9 2.15-1.46 3.53-1.46s2.63.56 3.53 1.46z\"/>")
      .name("Wifi1BarOutlined")
  }
}

export default Wifi1BarOutlined as any as Typed<DLightIconType>
