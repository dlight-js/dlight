import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ArrowDropDownTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m7 10 5 5 5-5H7z\"/>")
      .name("ArrowDropDownTwoTone")
  }
}

export default ArrowDropDownTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
