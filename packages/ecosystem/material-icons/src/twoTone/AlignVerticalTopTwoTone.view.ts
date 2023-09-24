import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class AlignVerticalTopTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 2v2H2V2h20zM7 22h3V6H7v16zm7-6h3V6h-3v10z\"/>")
      .name("AlignVerticalTopTwoTone")
  }
}

export default AlignVerticalTopTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
