import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ScreenshotFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17 1.01 7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 18H7V6h10v12zM9.5 8.5H12V7H8v4h1.5V8.5zM12 17h4v-4h-1.5v2.5H12V17z\"/>")
      .name("ScreenshotFilled")
  }
}

export default ScreenshotFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
