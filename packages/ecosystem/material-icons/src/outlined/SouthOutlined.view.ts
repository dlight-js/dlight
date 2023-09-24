import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SouthOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m19 15-1.41-1.41L13 18.17V2h-2v16.17l-4.59-4.59L5 15l7 7 7-7z\"/>")
      .name("SouthOutlined")
  }
}

export default SouthOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
