import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SdCardAlertOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 2h-8L4.02 8 4 20c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H6V8.83L10.83 4H18v16zm-7-5h2v2h-2zm0-7h2v5h-2z\"/>")
      .name("SdCardAlertOutlined")
  }
}

export default SdCardAlertOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
