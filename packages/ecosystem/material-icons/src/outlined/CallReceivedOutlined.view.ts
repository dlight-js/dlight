import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class CallReceivedOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 5.41 18.59 4 7 15.59V9H5v10h10v-2H8.41L20 5.41z\"/>")
      .name("CallReceivedOutlined")
  }
}

export default CallReceivedOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
