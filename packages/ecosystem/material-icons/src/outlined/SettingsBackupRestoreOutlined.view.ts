import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SettingsBackupRestoreOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M14 12c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm-2-9a9 9 0 0 0-9 9H0l4 4 4-4H5c0-3.87 3.13-7 7-7s7 3.13 7 7a6.995 6.995 0 0 1-11.06 5.7l-1.42 1.44A9 9 0 1 0 12 3z\"/>")
      .name("SettingsBackupRestoreOutlined")
  }
}

export default SettingsBackupRestoreOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
