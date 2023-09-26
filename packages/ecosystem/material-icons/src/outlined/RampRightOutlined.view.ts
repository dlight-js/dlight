import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class RampRightOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M11 21h2V6.83l1.59 1.59L16 7l-4-4-4 4 1.41 1.41L11 6.83V9c0 4.27-4.03 7.13-6 8.27l1.46 1.46C8.37 17.56 9.9 16.19 11 14.7V21z\"/>")
      .name("RampRightOutlined")
  }
}

export default RampRightOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
