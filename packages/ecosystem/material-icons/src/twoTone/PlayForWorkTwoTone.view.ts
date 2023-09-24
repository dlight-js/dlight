import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class PlayForWorkTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M11 5v5.59H7.5l4.5 4.5 4.5-4.5H13V5h-2zm-5 9c0 3.31 2.69 6 6 6s6-2.69 6-6h-2c0 2.21-1.79 4-4 4s-4-1.79-4-4H6z\"/>")
      .name("PlayForWorkTwoTone")
  }
}

export default PlayForWorkTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
