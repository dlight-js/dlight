import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PersonalVideoSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M23 3H1v16h7v2h8v-2h6.99L23 3zm-2 14H3V5h18v12z\"/>")
      .name("PersonalVideoSharp")
  }
}

export default PersonalVideoSharp as any as Typed<DLightIconType>
