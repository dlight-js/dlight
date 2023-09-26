import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class GppMaybeFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 2 4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z\"/>")
      .name("GppMaybeFilled")
  }
}

export default GppMaybeFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
