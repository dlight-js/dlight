import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SystemSecurityUpdateSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5 1v22h14V1H5zm12 17H7V6h10v12zm-1-6h-3V8h-2v4H8l4 4 4-4z\"/>")
      .name("SystemSecurityUpdateSharp")
  }
}

export default SystemSecurityUpdateSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
