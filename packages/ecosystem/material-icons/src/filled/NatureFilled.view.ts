import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class NatureFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M13 16.12a7 7 0 0 0 6.17-6.95c0-3.87-3.13-7-7-7s-7 3.13-7 7A6.98 6.98 0 0 0 11 16.06V20H5v2h14v-2h-6v-3.88z\"/>")
      .name("NatureFilled")
  }
}

export default NatureFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
