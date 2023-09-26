import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class AutoAwesomeMosaicFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 5v14a2 2 0 0 0 2 2h6V3H5a2 2 0 0 0-2 2zm16-2h-6v8h8V5c0-1.1-.9-2-2-2zm-6 18h6c1.1 0 2-.9 2-2v-6h-8v8z\"/>")
      .name("AutoAwesomeMosaicFilled")
  }
}

export default AutoAwesomeMosaicFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
