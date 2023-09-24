import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class Looks5Outlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-4-4v-2a2 2 0 0 0-2-2h-2V9h4V7H9v6h4v2H9v2h4a2 2 0 0 0 2-2z\"/>")
      .name("Looks5Outlined")
  }
}

export default Looks5Outlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
