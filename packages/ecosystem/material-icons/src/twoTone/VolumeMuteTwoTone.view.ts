import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class VolumeMuteTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M9 13h2.83L14 15.17V8.83L11.83 11H9z\" opacity=\".3\"/><path d=\"M7 9v6h4l5 5V4l-5 5H7zm7-.17v6.34L11.83 13H9v-2h2.83L14 8.83z\"/>")
      .name("VolumeMuteTwoTone")
  }
}

export default VolumeMuteTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
