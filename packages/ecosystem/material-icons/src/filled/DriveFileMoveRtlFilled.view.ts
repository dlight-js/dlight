import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class DriveFileMoveRtlFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8 11-4-4 4-4v3h4v2h-4v3z\"/>")
      .name("DriveFileMoveRtlFilled")
  }
}

export default DriveFileMoveRtlFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
