import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class HeightFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M13 6.99h3L12 3 8 6.99h3v10.02H8L12 21l4-3.99h-3z\"/>")
      .name("HeightFilled")
  }
}

export default HeightFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
