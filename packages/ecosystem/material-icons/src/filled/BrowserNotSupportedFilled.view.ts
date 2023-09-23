import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class BrowserNotSupportedFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 6v10.5l1.95 1.95c.03-.15.05-.3.05-.45V6c0-1.1-.9-2-2-2H6.5l2 2H19zM3.22 3.32 1.95 4.59 3 5.64V18c0 1.1.9 2 2 2h12.36l2.06 2.06 1.27-1.27L3.22 3.32zM15 18H5V7.64L15.36 18H15z\"/>")
      .name("BrowserNotSupportedFilled")
  }
}

export default BrowserNotSupportedFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
