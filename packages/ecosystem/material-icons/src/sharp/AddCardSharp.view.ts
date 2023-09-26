import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class AddCardSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M2.01 4 2 20h12v-2H4v-6h18V4H2.01zM20 8H4V6h16v2zm4 9v2h-3v3h-2v-3h-3v-2h3v-3h2v3h3z\"/>")
      .name("AddCardSharp")
  }
}

export default AddCardSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
