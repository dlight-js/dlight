import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class GMobiledataSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 11v2h2v2H9V9h7V7H7v10h9v-6h-4z\"/>")
      .name("GMobiledataSharp")
  }
}

export default GMobiledataSharp as any as Typed<DLightIconType>
