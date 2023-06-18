import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class WbTwilightOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m16.955 8.662 2.12-2.122 1.416 1.414-2.121 2.122zM2 18h20v2H2zm9-14h2v3h-2zM3.543 7.925 4.957 6.51l2.121 2.12-1.414 1.415zM5 16h14c0-3.87-3.13-7-7-7s-7 3.13-7 7z\"/>")
      .name("WbTwilightOutlined")
  }
}

export default WbTwilightOutlined as any as Typed<DLightIconType>
