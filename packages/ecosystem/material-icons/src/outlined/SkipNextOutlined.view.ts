import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SkipNextOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m6 18 8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2z\"/>")
      .name("SkipNextOutlined")
  }
}

export default SkipNextOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
