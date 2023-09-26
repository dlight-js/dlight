import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class DeskFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M2 6v12h2V8h10v10h2v-2h4v2h2V6H2zm18 2v2h-4V8h4zm-4 6v-2h4v2h-4z\"/>")
      .name("DeskFilled")
  }
}

export default DeskFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
