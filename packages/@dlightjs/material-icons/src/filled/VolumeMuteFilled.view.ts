import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class VolumeMuteFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M7 9v6h4l5 5V4l-5 5H7z\"/>")
      .name("VolumeMuteFilled")
  }
}

export default VolumeMuteFilled as any as Typed<DLightIconType>
