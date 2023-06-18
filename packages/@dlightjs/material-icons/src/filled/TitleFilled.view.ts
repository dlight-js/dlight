import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class TitleFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5 4v3h5.5v12h3V7H19V4z\"/>")
      .name("TitleFilled")
  }
}

export default TitleFilled as any as Typed<DLightIconType>
