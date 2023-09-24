import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class DockSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M8 23h8v-2H8v2zM18 1.01 6 1v18h12V1.01zM16 15H8V5h8v10z\"/>")
      .name("DockSharp")
  }
}

export default DockSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
