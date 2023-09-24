import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class AddBoxSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 3H3v18h18V3zm-4 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z\"/>")
      .name("AddBoxSharp")
  }
}

export default AddBoxSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
