import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class MmsSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 2H2v20l4-4h16V2zM5 14l3.5-4.5 2.5 3.01L14.5 8l4.5 6H5z\"/>")
      .name("MmsSharp")
  }
}

export default MmsSharp as any as Typed<DLightIconType>
