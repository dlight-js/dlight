import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class BoltSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M11 21h-1l1-7H6.74S10.42 7.54 13 3h1l-1 7h4.28L11 21z\"/>")
      .name("BoltSharp")
  }
}

export default BoltSharp as any as Typed<DLightIconType>
