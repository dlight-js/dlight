import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class LaptopSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m20 18 2-2V4H2v12l2 2H0v2h24v-2h-4zM4 6h16v10H4V6z\"/>")
      .name("LaptopSharp")
  }
}

export default LaptopSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
