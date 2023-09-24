import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class TvTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 5h18v12H3z\" opacity=\".3\"/><path d=\"M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z\"/>")
      .name("TvTwoTone")
  }
}

export default TvTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
