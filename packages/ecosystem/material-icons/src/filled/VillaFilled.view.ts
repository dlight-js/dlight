import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class VillaFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M7 21H3V8l13-5v7H7v11zm12-11c-1.1 0-2 .9-2 2H9v9h5v-5h2v5h5v-9c0-1.1-.9-2-2-2z\"/>")
      .name("VillaFilled")
  }
}

export default VillaFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
