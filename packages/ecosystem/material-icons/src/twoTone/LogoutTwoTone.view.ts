import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class LogoutTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5 5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h7v-2H5V5zm16 7-4-4v3H9v2h8v3l4-4z\"/>")
      .name("LogoutTwoTone")
  }
}

export default LogoutTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
