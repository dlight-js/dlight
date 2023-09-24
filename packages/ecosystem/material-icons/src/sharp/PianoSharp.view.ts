import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class PianoSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 3H3v18h18V3zm-8 11.5h1.25V19h-4.5v-4.5H11V5h2v9.5zM5 5h2v9.5h1.25V19H5V5zm14 14h-3.25v-4.5H17V5h2v14z\"/>")
      .name("PianoSharp")
  }
}

export default PianoSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
