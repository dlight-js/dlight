import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class HexagonFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17.2 3H6.8l-5.2 9 5.2 9h10.4l5.2-9z\"/>")
      .name("HexagonFilled")
  }
}

export default HexagonFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
