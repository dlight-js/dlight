import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ComputerSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m20 18 2-2V4H2v12l2 2H0v2h24v-2h-4zM4 6h16v10H4V6z\"/>")
      .name("ComputerSharp")
  }
}

export default ComputerSharp as any as Typed<DLightIconType>
