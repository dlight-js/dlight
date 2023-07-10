import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class IceSkatingSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 17c0 1.66-1.34 3-3 3h-2v-2h3l-.01-6-5.71-1.43A3 3 0 0 1 11.32 9H8V8h3.02L11 7H8V6h3V3H3v15h3v2H2v2h16c2.76 0 5-2.24 5-5h-2zm-7 3H8v-2h6v2z\"/>")
      .name("IceSkatingSharp")
  }
}

export default IceSkatingSharp as any as Typed<DLightIconType>
