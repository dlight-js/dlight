import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FlagFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M14.4 6 14 4H5v17h2v-7h5.6l.4 2h7V6z\"/>")
      .name("FlagFilled")
  }
}

export default FlagFilled as any as Typed<DLightIconType>
