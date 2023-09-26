import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class Icon1xMobiledataFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M4 7h4v10H6V9H4V7zm11.83 4.72L18.66 7h-2.33l-1.66 2.77L13 7h-2.33l2.83 4.72L10.33 17h2.33l2-3.34 2 3.34H19l-3.17-5.28z\"/>")
      .name("Icon1xMobiledataFilled")
  }
}

export default Icon1xMobiledataFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
