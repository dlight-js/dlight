import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class DetailsRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m11.13 4.57-8.3 14.94c-.37.67.11 1.49.87 1.49h16.6c.76 0 1.24-.82.87-1.49l-8.3-14.94a.997.997 0 0 0-1.74 0zM13 8.92 18.6 19H13V8.92zm-2 0V19H5.4L11 8.92z\"/>")
      .name("DetailsRound")
  }
}

export default DetailsRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
