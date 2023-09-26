import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class BurstModeTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M11 17h10V7H11v10zm3-3.53 1.43 1.72 2-2.58L20 15.99h-8l2-2.52z\" opacity=\".3\"/><path d=\"M1 5h2v14H1zm4 0h2v14H5zm17 0H10c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zm-1 12H11V7h10v10zm-3.57-4.38-2 2.57L14 13.47l-2 2.52h8z\"/>")
      .name("BurstModeTwoTone")
  }
}

export default BurstModeTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
