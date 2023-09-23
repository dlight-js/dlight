import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ScreenSearchDesktopSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M1 19h22v2H1zM22 3H2v15h19.99L22 3zm-6.53 12.03-2.09-2.09c-1.35.87-3.17.71-4.36-.47-1.37-1.37-1.37-3.58 0-4.95s3.58-1.37 4.95 0c1.18 1.18 1.34 3 .47 4.36l2.09 2.09-1.06 1.06z\"/><circle cx=\"11.5\" cy=\"10\" r=\"2\"/>")
      .name("ScreenSearchDesktopSharp")
  }
}

export default ScreenSearchDesktopSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
