import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class UnfoldLessSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M7.41 18.59 8.83 20 12 16.83 15.17 20l1.41-1.41L12 14l-4.59 4.59zm9.18-13.18L15.17 4 12 7.17 8.83 4 7.41 5.41 12 10l4.59-4.59z\"/>")
      .name("UnfoldLessSharp")
  }
}

export default UnfoldLessSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
