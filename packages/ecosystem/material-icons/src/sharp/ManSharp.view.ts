import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ManSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16 7H8v8h2v7h4v-7h2z\"/><circle cx=\"12\" cy=\"4\" r=\"2\"/>")
      .name("ManSharp")
  }
}

export default ManSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
