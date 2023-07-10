import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class LabelSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M17.03 5 3 5.01v13.98l14.03.01L22 12l-4.97-7z\"/>")
      .name("LabelSharp")
  }
}

export default LabelSharp as any as Typed<DLightIconType>
