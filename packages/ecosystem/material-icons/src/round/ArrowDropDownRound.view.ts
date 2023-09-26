import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ArrowDropDownRound {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m8.71 11.71 2.59 2.59c.39.39 1.02.39 1.41 0l2.59-2.59c.63-.63.18-1.71-.71-1.71H9.41c-.89 0-1.33 1.08-.7 1.71z\"/>")
      .name("ArrowDropDownRound")
  }
}

export default ArrowDropDownRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
