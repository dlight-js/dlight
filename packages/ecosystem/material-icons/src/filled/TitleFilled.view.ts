import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class TitleFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5 4v3h5.5v12h3V7H19V4z\"/>")
      .name("TitleFilled")
  }
}

export default TitleFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
