import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class DesktopMacSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M23 2H1v16h9l-2 3v1h8v-1l-2-3h9V2zm-2 12H3V4h18v10z\"/>")
      .name("DesktopMacSharp")
  }
}

export default DesktopMacSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
