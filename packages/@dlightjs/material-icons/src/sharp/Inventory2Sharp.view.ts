import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class Inventory2Sharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M2 2v6.7h1V22h18V8.7h1V2H2zm13 12H9v-2h6v2zm5-7H4V4h16v3z\"/>")
      .name("Inventory2Sharp")
  }
}

export default Inventory2Sharp as any as Typed<DLightIconType>
