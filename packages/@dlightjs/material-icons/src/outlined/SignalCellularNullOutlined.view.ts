import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SignalCellularNullOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 6.83V20H6.83L20 6.83M22 2 2 22h20V2z\"/>")
      .name("SignalCellularNullOutlined")
  }
}

export default SignalCellularNullOutlined as any as Typed<DLightIconType>
