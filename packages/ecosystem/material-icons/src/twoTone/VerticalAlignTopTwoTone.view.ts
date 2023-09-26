import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class VerticalAlignTopTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M4 3h16v2H4zm4 8h3v10h2V11h3l-4-4z\"/>")
      .name("VerticalAlignTopTwoTone")
  }
}

export default VerticalAlignTopTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
