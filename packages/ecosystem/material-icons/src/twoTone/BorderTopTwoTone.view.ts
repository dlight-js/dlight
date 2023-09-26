import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class BorderTopTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 19h2v2h-2zM3 19h2v2H3zm8 0h2v2h-2zm-8-8h2v2H3zm0 4h2v2H3zm4 4h2v2H7zm4-12h2v2h-2zm0 4h2v2h-2zM3 7h2v2H3zm0-4h18v2H3zm8 12h2v2h-2zm4 4h2v2h-2zm-8-8h2v2H7zm8 0h2v2h-2zm4 4h2v2h-2zm0-4h2v2h-2zm0-4h2v2h-2z\"/>")
      .name("BorderTopTwoTone")
  }
}

export default BorderTopTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
