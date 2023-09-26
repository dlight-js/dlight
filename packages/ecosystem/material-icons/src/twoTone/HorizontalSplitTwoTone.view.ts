import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class HorizontalSplitTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 15v2H5v-2h14m2-10H3v2h18V5zm0 4H3v2h18V9zm0 4H3v6h18v-6z\"/><path d=\"M5 15h14v2H5z\" opacity=\".3\"/>")
      .name("HorizontalSplitTwoTone")
  }
}

export default HorizontalSplitTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
