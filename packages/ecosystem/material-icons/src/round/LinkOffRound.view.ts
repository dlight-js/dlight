import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class LinkOffRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M14 9h2.87c1.46 0 2.8.98 3.08 2.42.31 1.64-.74 3.11-2.22 3.48l1.53 1.53c1.77-.91 2.95-2.82 2.7-5.01C21.68 8.86 19.37 7 16.79 7H14c-.55 0-1 .45-1 1s.45 1 1 1zM3.51 3.51A.996.996 0 1 0 2.1 4.92l2.64 2.64c-1.77.91-2.95 2.82-2.7 5.01C2.32 15.14 4.63 17 7.21 17H10c.55 0 1-.45 1-1s-.45-1-1-1H7.13c-1.46 0-2.8-.98-3.08-2.42-.31-1.64.75-3.11 2.22-3.48l2.12 2.12c-.23.19-.39.46-.39.78 0 .55.45 1 1 1h1.17l8.9 8.9a.996.996 0 1 0 1.41-1.41L3.51 3.51zM14 11l1.71 1.71A1.003 1.003 0 0 0 15 11h-1z\"/>")
      .name("LinkOffRound")
  }
}

export default LinkOffRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
