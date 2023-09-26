import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class NightlifeFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M1 5h14l-6 9v4h2v2H5v-2h2v-4L1 5zm9.1 4 1.4-2H4.49l1.4 2h4.21zM17 5h5v3h-3v9c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3a3 3 0 0 1 1 .17V5z\"/>")
      .name("NightlifeFilled")
  }
}

export default NightlifeFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
