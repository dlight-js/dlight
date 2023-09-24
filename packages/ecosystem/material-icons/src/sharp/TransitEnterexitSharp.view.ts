import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class TransitEnterexitSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16 18H6V8h3v4.77L15.98 6 18 8.03 11.15 15H16v3z\"/>")
      .name("TransitEnterexitSharp")
  }
}

export default TransitEnterexitSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
