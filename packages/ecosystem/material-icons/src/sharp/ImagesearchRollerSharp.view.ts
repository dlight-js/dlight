import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ImagesearchRollerSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 2v6H6V6H4v4h10v5h2v8h-6v-8h2v-3H2V4h4V2h14z\"/>")
      .name("ImagesearchRollerSharp")
  }
}

export default ImagesearchRollerSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
