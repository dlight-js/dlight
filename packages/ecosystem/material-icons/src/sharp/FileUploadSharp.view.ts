import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FileUploadSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5 10h4v6h6v-6h4l-7-7-7 7zm0 8v2h14v-2H5z\"/>")
      .name("FileUploadSharp")
  }
}

export default FileUploadSharp as any as Typed<DLightIconType>
