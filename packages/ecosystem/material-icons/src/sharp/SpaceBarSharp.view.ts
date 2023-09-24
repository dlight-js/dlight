import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SpaceBarSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 9v4H6V9H4v6h16V9h-2z\"/>")
      .name("SpaceBarSharp")
  }
}

export default SpaceBarSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
