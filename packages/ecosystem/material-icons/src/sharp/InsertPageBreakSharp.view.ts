import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class InsertPageBreakSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M4 17h16v5H4zm16-9-6-6H4.01L4 11h16V8zm-7 1V3.5L18.5 9H13zm-4 4h6v2H9zm8 0h6v2h-6zM1 13h6v2H1z\"/>")
      .name("InsertPageBreakSharp")
  }
}

export default InsertPageBreakSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
