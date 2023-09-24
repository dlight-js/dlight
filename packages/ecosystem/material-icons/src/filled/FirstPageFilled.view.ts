import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class FirstPageFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18.41 16.59 13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z\"/>")
      .name("FirstPageFilled")
  }
}

export default FirstPageFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
