import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class LocalCafeSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 3H4v14h14v-7h2c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 5h-2V5h2v3zM2 21h18v-2H2v2z\"/>")
      .name("LocalCafeSharp")
  }
}

export default LocalCafeSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
