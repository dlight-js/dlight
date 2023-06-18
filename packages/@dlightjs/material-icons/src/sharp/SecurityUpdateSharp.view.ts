import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SecurityUpdateSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5 1v22h14V1H5zm12 17H7V6h10v12zm-1-6h-3V8h-2v4H8l4 4 4-4z\"/>")
      .name("SecurityUpdateSharp")
  }
}

export default SecurityUpdateSharp as any as Typed<DLightIconType>
