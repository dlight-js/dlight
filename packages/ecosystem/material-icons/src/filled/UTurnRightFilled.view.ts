import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class UTurnRightFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6 9v12h2V9c0-2.21 1.79-4 4-4s4 1.79 4 4v4.17l-1.59-1.59L13 13l4 4 4-4-1.41-1.41L18 13.17V9c0-3.31-2.69-6-6-6S6 5.69 6 9z\"/>")
      .name("UTurnRightFilled")
  }
}

export default UTurnRightFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
