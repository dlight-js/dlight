import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class TransitEnterexitSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16 18H6V8h3v4.77L15.98 6 18 8.03 11.15 15H16v3z\"/>")
      .name("TransitEnterexitSharp")
  }
}

export default TransitEnterexitSharp as any as Typed<DLightIconType>
