import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class DriveFileMoveRtlOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V6h5.17l2 2H20v10zm-6.59-2.41L12 17l-4-4 4-4 1.41 1.41L11.83 12H16v2h-4.17l1.58 1.59z\"/>")
      .name("DriveFileMoveRtlOutlined")
  }
}

export default DriveFileMoveRtlOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
