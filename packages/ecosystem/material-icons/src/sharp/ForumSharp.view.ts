import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ForumSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 6h-3v9H6v3h12l4 4V6zm-5 7V2H2v15l4-4h11z\"/>")
      .name("ForumSharp")
  }
}

export default ForumSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
