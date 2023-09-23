import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class EarbudsSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6.2 3.01C4.44 2.89 3 4.42 3 6.19V16c0 2.76 2.24 5 5 5s5-2.24 5-5V8c0-1.66 1.34-3 3-3s3 1.34 3 3v7h-.83c-1.61 0-3.06 1.18-3.17 2.79A3 3 0 0 0 17.8 21c1.76.12 3.2-1.42 3.2-3.18V8c0-2.76-2.24-5-5-5s-5 2.24-5 5v8c0 1.66-1.34 3-3 3s-3-1.34-3-3V9h.83C7.44 9 8.89 7.82 9 6.21c.11-1.68-1.17-3.1-2.8-3.2z\"/><path d=\"M6 3h3v6H6zm9 12h3v6h-3z\"/>")
      .name("EarbudsSharp")
  }
}

export default EarbudsSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
