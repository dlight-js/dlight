import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class TurnSharpRightTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m18 6.83 1.59 1.59L21 7l-4-4-4 4 1.41 1.41L16 6.83V13H8c-1.1 0-2 .9-2 2v6h2v-6h8c1.1 0 2-.9 2-2V6.83z\"/>")
      .name("TurnSharpRightTwoTone")
  }
}

export default TurnSharpRightTwoTone as any as Typed<DLightIconType>
