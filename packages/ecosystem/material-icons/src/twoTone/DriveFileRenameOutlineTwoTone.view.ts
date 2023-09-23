import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class DriveFileRenameOutlineTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12.06 10.02 5 17.08V18h.92l7.06-7.06z\" opacity=\".3\"/><path d=\"m15 16-4 4h10v-4zm-2.94-8.81L3 16.25V20h3.75l9.06-9.06-3.75-3.75zM5.92 18H5v-.92l7.06-7.06.92.92L5.92 18zm12.79-9.96a.996.996 0 0 0 0-1.41l-2.34-2.34a1.001 1.001 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z\"/>")
      .name("DriveFileRenameOutlineTwoTone")
  }
}

export default DriveFileRenameOutlineTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
