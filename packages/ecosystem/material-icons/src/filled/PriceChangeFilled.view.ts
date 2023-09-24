import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class PriceChangeFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm-8 6H8v1h3c.55 0 1 .45 1 1v3c0 .55-.45 1-1 1h-1v1H8v-1H6v-2h4v-1H7c-.55 0-1-.45-1-1V9c0-.55.45-1 1-1h1V7h2v1h2v2zm4 6.25-2-2h4l-2 2zM14 10l2-2 2 2h-4z\"/>")
      .name("PriceChangeFilled")
  }
}

export default PriceChangeFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
