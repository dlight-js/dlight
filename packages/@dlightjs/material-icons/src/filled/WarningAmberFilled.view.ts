import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class WarningAmberFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 5.99 19.53 19H4.47L12 5.99M12 2 1 21h22L12 2z\"/><path d=\"M13 16h-2v2h2zm0-6h-2v5h2z\"/>")
      .name("WarningAmberFilled")
  }
}

export default WarningAmberFilled as any as Typed<DLightIconType>
