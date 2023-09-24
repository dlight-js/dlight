import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class FiberManualRecordOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6m0-2c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z\"/>")
      .name("FiberManualRecordOutlined")
  }
}

export default FiberManualRecordOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
