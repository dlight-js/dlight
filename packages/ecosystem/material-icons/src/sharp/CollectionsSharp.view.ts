import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class CollectionsSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 18V2H6v16h16zm-11-6 2.03 2.71L16 11l4 5H8l3-4zM2 6v16h16v-2H4V6H2z\"/>")
      .name("CollectionsSharp")
  }
}

export default CollectionsSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
