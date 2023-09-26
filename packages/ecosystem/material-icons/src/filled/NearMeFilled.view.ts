import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class NearMeFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 3 3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z\"/>")
      .name("NearMeFilled")
  }
}

export default NearMeFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
