import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class OndemandVideoTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 17h18V5H3v12zM9 7l7 4-7 4V7z\" opacity=\".3\"/><path d=\"M9 7v8l7-4zm12-4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z\"/>")
      .name("OndemandVideoTwoTone")
  }
}

export default OndemandVideoTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
