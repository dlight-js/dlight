import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class Looks4Sharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21.04 3h-18v18h18V3zm-6 14h-2v-4h-4V7h2v4h2V7h2v10z\"/>")
      .name("Looks4Sharp")
  }
}

export default Looks4Sharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
