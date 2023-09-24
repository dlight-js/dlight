import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class DehazeOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M2 16v2h20v-2H2zm0-5v2h20v-2H2zm0-5v2h20V6H2z\"/>")
      .name("DehazeOutlined")
  }
}

export default DehazeOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
