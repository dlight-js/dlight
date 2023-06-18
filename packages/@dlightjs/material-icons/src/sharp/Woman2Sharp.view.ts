import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class Woman2Sharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M13.41 7h-2.82L7 16h3.5v6h3v-6H17z\"/><circle cx=\"12\" cy=\"4\" r=\"2\"/>")
      .name("Woman2Sharp")
  }
}

export default Woman2Sharp as any as Typed<DLightIconType>
