import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FolderSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M10 4H2v16h20V6H12l-2-2z\"/>")
      .name("FolderSharp")
  }
}

export default FolderSharp as any as Typed<DLightIconType>
