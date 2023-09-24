import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ExpandMoreFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z\"/>")
      .name("ExpandMoreFilled")
  }
}

export default ExpandMoreFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
