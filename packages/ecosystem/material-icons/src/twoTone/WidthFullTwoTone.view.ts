import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class WidthFullTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M7 6h10v12H7z\" opacity=\".3\"/><path d=\"M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM5 18H4V6h1v12zm12 0H7V6h10v12zm3 0h-1V6h1v12z\"/>")
      .name("WidthFullTwoTone")
  }
}

export default WidthFullTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
