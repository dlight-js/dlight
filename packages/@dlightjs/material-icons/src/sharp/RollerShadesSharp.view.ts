import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class RollerShadesSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 19V3H4v16H2v2h20v-2h-2zM6 19v-6h5v1.8c-.4.3-.8.8-.8 1.4 0 1 .8 1.8 1.8 1.8s1.8-.8 1.8-1.8c0-.6-.3-1.1-.8-1.4V13h5v6H6z\"/>")
      .name("RollerShadesSharp")
  }
}

export default RollerShadesSharp as any as Typed<DLightIconType>
