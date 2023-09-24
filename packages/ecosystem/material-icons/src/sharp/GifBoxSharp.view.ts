import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class GifBoxSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 3H3v18h18V3zM9.5 13v-1h1v2h-3v-4h3v1h-2v2h1zm3 1h-1v-4h1v4zm4-3h-2v.5H16v1h-1.5V14h-1v-4h3v1z\"/>")
      .name("GifBoxSharp")
  }
}

export default GifBoxSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
