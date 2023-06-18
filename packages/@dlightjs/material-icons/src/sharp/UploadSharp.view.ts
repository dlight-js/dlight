import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class UploadSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z\"/>")
      .name("UploadSharp")
  }
}

export default UploadSharp as any as Typed<DLightIconType>
