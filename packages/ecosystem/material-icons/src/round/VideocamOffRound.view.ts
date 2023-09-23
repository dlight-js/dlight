import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class VideocamOffRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 14.2V8.91c0-.89-1.08-1.34-1.71-.71L17 10.5V7c0-.55-.45-1-1-1h-5.61l8.91 8.91c.62.63 1.7.18 1.7-.71zM2.71 2.56a.996.996 0 0 0 0 1.41L4.73 6H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.21 0 .39-.08.55-.18l2.48 2.48a.996.996 0 1 0 1.41-1.41L4.12 2.56a.996.996 0 0 0-1.41 0z\"/>")
      .name("VideocamOffRound")
  }
}

export default VideocamOffRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
