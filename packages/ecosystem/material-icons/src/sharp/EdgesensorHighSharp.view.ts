import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class EdgesensorHighSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 7h2v7H3V7zm-3 3h2v7H0v-7zm22-3h2v7h-2V7zm-3 3h2v7h-2v-7zm-1-8H6v20h12V2zm-2 15H8V7h8v10z\"/>")
      .name("EdgesensorHighSharp")
  }
}

export default EdgesensorHighSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
