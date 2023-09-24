import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class AdfScannerSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 12h-4V4H6v8H2v8h20v-8zm-6 0H8V6h8v6zm2 5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z\"/>")
      .name("AdfScannerSharp")
  }
}

export default AdfScannerSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
