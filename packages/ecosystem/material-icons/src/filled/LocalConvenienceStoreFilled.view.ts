import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class LocalConvenienceStoreFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 7V4H5v3H2v13h8v-4h4v4h8V7h-3zm-8 3H9v1h2v1H8V9h2V8H8V7h3v3zm5 2h-1v-2h-2V7h1v2h1V7h1v5z\"/>")
      .name("LocalConvenienceStoreFilled")
  }
}

export default LocalConvenienceStoreFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
