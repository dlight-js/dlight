import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class StartFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M14.59 7.41 18.17 11H6v2h12.17l-3.59 3.59L16 18l6-6-6-6-1.41 1.41zM2 6v12h2V6H2z\"/>")
      .name("StartFilled")
  }
}

export default StartFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
