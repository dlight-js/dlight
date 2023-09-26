import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class GMobiledataSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 11v2h2v2H9V9h7V7H7v10h9v-6h-4z\"/>")
      .name("GMobiledataSharp")
  }
}

export default GMobiledataSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
