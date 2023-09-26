import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class CurtainsClosedTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6 5h3v14H6zm9 0h3v14h-3z\" opacity=\".3\"/><path d=\"M20 19V3H4v16H2v2h20v-2h-2zM9 19H6V5h3v14zm4 0h-2V5h2v14zm5 0h-3V5h3v14z\"/>")
      .name("CurtainsClosedTwoTone")
  }
}

export default CurtainsClosedTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
