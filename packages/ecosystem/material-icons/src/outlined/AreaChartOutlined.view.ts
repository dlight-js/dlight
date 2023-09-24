import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class AreaChartOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m17 7-5-4-5 7-4-3v13h18V7h-4zm2 9.95-7-5.45L8 17l-3-2.4V11l2.44 1.83 4.96-6.95L16.3 9H19v7.95z\"/>")
      .name("AreaChartOutlined")
  }
}

export default AreaChartOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
