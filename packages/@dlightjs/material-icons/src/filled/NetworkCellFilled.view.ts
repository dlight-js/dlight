import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class NetworkCellFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M2 22h20V2L2 22zm18-2h-3V9.83l3-3V20z\"/>")
      .name("NetworkCellFilled")
  }
}

export default NetworkCellFilled as any as Typed<DLightIconType>
