import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class LocalPrintshopRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 7V4c0-.55-.45-1-1-1H7c-.55 0-1 .45-1 1v3h12zm1 1H5c-1.66 0-3 1.34-3 3v5c0 .55.45 1 1 1h3v2c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-2h3c.55 0 1-.45 1-1v-5c0-1.66-1.34-3-3-3zm-3 11H8v-4h8v4zm2-6.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z\"/>")
      .name("LocalPrintshopRound")
  }
}

export default LocalPrintshopRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
