import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SignalCellular4BarOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M2 22h20V2L2 22z\"/>")
      .name("SignalCellular4BarOutlined")
  }
}

export default SignalCellular4BarOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
