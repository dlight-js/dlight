import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class AnalyticsOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z\"/><path d=\"M7 12h2v5H7zm8-5h2v10h-2zm-4 7h2v3h-2zm0-4h2v2h-2z\"/>")
      .name("AnalyticsOutlined")
  }
}

export default AnalyticsOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
