import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class AutoFixNormalSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m20 7 .94-2.06L23 4l-2.06-.94L20 1l-.94 2.06L17 4l2.06.94zm-1.59 2.83-4.24-4.24L1.59 18.17l4.24 4.24L18.41 9.83zm-4.2 1.38L12.8 9.8l1.38-1.38 1.41 1.41-1.38 1.38z\"/>")
      .name("AutoFixNormalSharp")
  }
}

export default AutoFixNormalSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
