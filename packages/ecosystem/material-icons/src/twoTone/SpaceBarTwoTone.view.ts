import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SpaceBarTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 13H6V9H4v6h16V9h-2z\"/>")
      .name("SpaceBarTwoTone")
  }
}

export default SpaceBarTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
