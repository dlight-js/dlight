import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FolderCopySharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 6H1v15h19v-2H3z\"/><path d=\"M23 4h-9l-2-2H5.01L5 17h18V4z\"/>")
      .name("FolderCopySharp")
  }
}

export default FolderCopySharp as any as Typed<DLightIconType>
