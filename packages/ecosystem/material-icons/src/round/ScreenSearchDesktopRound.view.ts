import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ScreenSearchDesktopRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 19H2c-.55 0-1 .45-1 1s.45 1 1 1h20c.55 0 1-.45 1-1s-.45-1-1-1zM4 18h16c1.1 0 1.99-.9 1.99-2L22 5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2zm4.59-9.95a3.497 3.497 0 0 1 5.38-.52c1.18 1.18 1.34 3 .47 4.36L16 13.44c.29.29.29.77 0 1.06-.29.29-.77.29-1.06 0l-1.55-1.55c-1.57 1-3.76.64-4.87-1.11-.73-1.14-.69-2.67.07-3.79z\"/><circle cx=\"11.5\" cy=\"10\" r=\"2\"/>")
      .name("ScreenSearchDesktopRound")
  }
}

export default ScreenSearchDesktopRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
