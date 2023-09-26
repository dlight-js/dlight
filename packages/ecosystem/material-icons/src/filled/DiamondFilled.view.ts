import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class DiamondFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12.16 3h-.32L9.21 8.25h5.58zm4.3 5.25h5.16L19 3h-5.16zm4.92 1.5h-8.63V20.1zM11.25 20.1V9.75H2.62zM7.54 8.25 10.16 3H5L2.38 8.25z\"/>")
      .name("DiamondFilled")
  }
}

export default DiamondFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
