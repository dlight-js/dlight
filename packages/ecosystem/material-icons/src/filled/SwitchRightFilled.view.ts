import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SwitchRightFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15.5 15.38V8.62L18.88 12l-3.38 3.38M14 19l7-7-7-7v14zm-4 0V5l-7 7 7 7z\"/>")
      .name("SwitchRightFilled")
  }
}

export default SwitchRightFilled as any as Typed<DLightIconType>
