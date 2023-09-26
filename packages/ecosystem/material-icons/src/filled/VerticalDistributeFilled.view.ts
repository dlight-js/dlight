import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class VerticalDistributeFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 2v2H2V2h20zM7 10.5v3h10v-3H7zM2 20v2h20v-2H2z\"/>")
      .name("VerticalDistributeFilled")
  }
}

export default VerticalDistributeFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
