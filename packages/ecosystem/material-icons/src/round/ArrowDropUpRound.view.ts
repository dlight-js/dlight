import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ArrowDropUpRound {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M8.71 12.29 11.3 9.7a.996.996 0 0 1 1.41 0l2.59 2.59c.63.63.18 1.71-.71 1.71H9.41c-.89 0-1.33-1.08-.7-1.71z\"/>")
      .name("ArrowDropUpRound")
  }
}

export default ArrowDropUpRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
