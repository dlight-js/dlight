import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class BrowserNotSupportedRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 6v10.5l1.95 1.95c.03-.15.05-.3.05-.45V6c0-1.1-.9-2-2-2H6.5l2 2H19zM3.86 3.95a.9.9 0 0 0-1.27 0 .9.9 0 0 0 0 1.27l.41.42V18c0 1.1.9 2 2 2h12.36l1.42 1.42a.9.9 0 0 0 1.27 0 .9.9 0 0 0 0-1.27L3.86 3.95zM5 18V7.64L15.36 18H5z\"/>")
      .name("BrowserNotSupportedRound")
  }
}

export default BrowserNotSupportedRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
