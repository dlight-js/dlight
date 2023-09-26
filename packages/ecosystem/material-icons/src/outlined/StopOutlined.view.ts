import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class StopOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16 8v8H8V8h8m2-2H6v12h12V6z\"/>")
      .name("StopOutlined")
  }
}

export default StopOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
