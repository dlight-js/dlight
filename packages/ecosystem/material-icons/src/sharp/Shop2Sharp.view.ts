import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class Shop2Sharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 9H1v13h18v-2H3z\"/><path d=\"M18 5V1h-8v4H5v13h18V5h-5zm-6-2h4v2h-4V3zm0 12V8l5.5 3.5L12 15z\"/>")
      .name("Shop2Sharp")
  }
}

export default Shop2Sharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
