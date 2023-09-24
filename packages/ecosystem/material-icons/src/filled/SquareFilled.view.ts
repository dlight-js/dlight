import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SquareFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 3h18v18H3z\"/>")
      .name("SquareFilled")
  }
}

export default SquareFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
