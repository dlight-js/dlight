import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class LayersSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m11.99 18.54-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27-7.38 5.74zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z\"/>")
      .name("LayersSharp")
  }
}

export default LayersSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
