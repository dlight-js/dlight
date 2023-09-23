import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class WifiFindRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M11 14c0-3.36 2.64-6 6-6 2.2 0 4.08 1.13 5.13 2.86l.36-.37c.86-.86.76-2.27-.2-3.01A16.887 16.887 0 0 0 12 4C8.13 4 4.56 5.3 1.71 7.48c-.96.74-1.06 2.15-.2 3.01l9.08 9.09c.78.78 2.05.78 2.83 0l.45-.45C12.14 18.09 11 16.2 11 14z\"/><path d=\"M20.44 16.03c.35-.59.56-1.28.56-2.03 0-2.24-1.76-4-4-4s-4 1.76-4 4 1.76 4 4 4c.75 0 1.44-.21 2.03-.56l1.85 1.85a.996.996 0 1 0 1.41-1.41l-1.85-1.85zM17 16c-1.12 0-2-.88-2-2s.88-2 2-2 2 .88 2 2-.88 2-2 2z\"/>")
      .name("WifiFindRound")
  }
}

export default WifiFindRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
