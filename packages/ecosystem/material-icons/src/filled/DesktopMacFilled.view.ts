import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class DesktopMacFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h6l-2 2v1h8v-1l-2-2h6c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2\"/>")
      .name("DesktopMacFilled")
  }
}

export default DesktopMacFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
