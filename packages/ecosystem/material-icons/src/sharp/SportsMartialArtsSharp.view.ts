import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SportsMartialArtsSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m19.8 2-8.2 6.7-1.21-1.04 3.6-2.08L9.41 1 8 2.41l2.74 2.74L5 8.46l-1.19 4.29L6.27 17 8 16l-2.03-3.52.35-1.3L9.5 13l.5 9h2l.5-10L21 3.4z\"/><circle cx=\"5\" cy=\"5\" r=\"2\"/>")
      .name("SportsMartialArtsSharp")
  }
}

export default SportsMartialArtsSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
