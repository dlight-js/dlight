import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class Crop54Outlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 4H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H5V6h14v12z\"/>")
      .name("Crop54Outlined")
  }
}

export default Crop54Outlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
