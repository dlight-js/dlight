import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class EmergencyFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m20.79 9.23-2-3.46L14 8.54V3h-4v5.54L5.21 5.77l-2 3.46L8 12l-4.79 2.77 2 3.46L10 15.46V21h4v-5.54l4.79 2.77 2-3.46L16 12z\"/>")
      .name("EmergencyFilled")
  }
}

export default EmergencyFilled as any as Typed<DLightIconType>
