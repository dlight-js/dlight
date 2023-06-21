import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ViewComfyFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M2 4v7h20V4H2zm8 16h12v-7H10v7zm-8 0h6v-7H2v7z\"/>")
      .name("ViewComfyFilled")
  }
}

export default ViewComfyFilled as any as Typed<DLightIconType>
