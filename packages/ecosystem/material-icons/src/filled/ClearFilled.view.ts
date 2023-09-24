import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ClearFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\"/>")
      .name("ClearFilled")
  }
}

export default ClearFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
