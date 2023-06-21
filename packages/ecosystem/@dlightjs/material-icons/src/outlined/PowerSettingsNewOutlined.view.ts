import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PowerSettingsNewOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M13 3h-2v10h2V3zm4.83 2.17-1.42 1.42A6.92 6.92 0 0 1 19 12c0 3.87-3.13 7-7 7A6.995 6.995 0 0 1 7.58 6.58L6.17 5.17A8.932 8.932 0 0 0 3 12a9 9 0 0 0 18 0c0-2.74-1.23-5.18-3.17-6.83z\"/>")
      .name("PowerSettingsNewOutlined")
  }
}

export default PowerSettingsNewOutlined as any as Typed<DLightIconType>
