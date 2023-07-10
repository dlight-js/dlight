import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class VolumeDownOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02A4.5 4.5 0 0 0 16 7.97zM5 9v6h4l5 5V4L9 9H5zm7-.17v6.34L9.83 13H7v-2h2.83L12 8.83z\"/>")
      .name("VolumeDownOutlined")
  }
}

export default VolumeDownOutlined as any as Typed<DLightIconType>
