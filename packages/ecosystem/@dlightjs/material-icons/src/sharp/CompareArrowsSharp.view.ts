import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class CompareArrowsSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M9.01 14H2v2h7.01v3L13 15l-3.99-4v3zm5.98-1v-3H22V8h-7.01V5L11 9l3.99 4z\"/>")
      .name("CompareArrowsSharp")
  }
}

export default CompareArrowsSharp as any as Typed<DLightIconType>
