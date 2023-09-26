import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class FunctionsOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 4H6v2l6.5 6L6 18v2h12v-3h-7l5-5-5-5h7V4z\"/>")
      .name("FunctionsOutlined")
  }
}

export default FunctionsOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
