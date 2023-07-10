import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ViewStreamSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 19v-6h18v6H3zM3 5v6h18V5H3z\"/>")
      .name("ViewStreamSharp")
  }
}

export default ViewStreamSharp as any as Typed<DLightIconType>
