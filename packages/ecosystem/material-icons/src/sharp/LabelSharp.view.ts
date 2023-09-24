import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class LabelSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17.03 5 3 5.01v13.98l14.03.01L22 12l-4.97-7z\"/>")
      .name("LabelSharp")
  }
}

export default LabelSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
