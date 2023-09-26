import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SyncAltFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m18 12 4-4-4-4v3H3v2h15zM6 12l-4 4 4 4v-3h15v-2H6z\"/>")
      .name("SyncAltFilled")
  }
}

export default SyncAltFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
