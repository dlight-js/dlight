import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class DiamondSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12.16 3h-.32L9.21 8.25h5.58zm4.3 5.25h5.16L19 3h-5.16zm4.92 1.5h-8.63V20.1zM11.25 20.1V9.75H2.62zM7.54 8.25 10.16 3H5L2.38 8.25z\"/>")
      .name("DiamondSharp")
  }
}

export default DiamondSharp as any as Typed<DLightIconType>
