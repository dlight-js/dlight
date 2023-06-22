import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FolderDeleteSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 6v14H2V4h8l2 2h10zm-5.5 4V9h-2v1H12v1.5h1V17h5v-5.5h1V10h-2.5zm0 5.5h-2v-4h2v4z\"/>")
      .name("FolderDeleteSharp")
  }
}

export default FolderDeleteSharp as any as Typed<DLightIconType>