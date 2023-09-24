import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ClearAllTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5 11h14v2H5zm-2 4h14v2H3zm4-8h14v2H7z\"/>")
      .name("ClearAllTwoTone")
  }
}

export default ClearAllTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
