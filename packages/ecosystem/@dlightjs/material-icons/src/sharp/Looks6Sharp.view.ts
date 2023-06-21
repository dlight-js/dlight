import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class Looks6Sharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M11 15h2v-2h-2v2zM21 3H3v18h18V3zm-6 6h-4v2h4v6H9V7h6v2z\"/>")
      .name("Looks6Sharp")
  }
}

export default Looks6Sharp as any as Typed<DLightIconType>
