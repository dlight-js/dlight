import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class EqualizerTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16 9h4v11h-4zm-6-5h4v16h-4zm-6 8h4v8H4z\"/>")
      .name("EqualizerTwoTone")
  }
}

export default EqualizerTwoTone as any as Typed<DLightIconType>
