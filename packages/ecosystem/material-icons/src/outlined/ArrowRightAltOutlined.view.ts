import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ArrowRightAltOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16.01 11H4v2h12.01v3L20 12l-3.99-4v3z\"/>")
      .name("ArrowRightAltOutlined")
  }
}

export default ArrowRightAltOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
