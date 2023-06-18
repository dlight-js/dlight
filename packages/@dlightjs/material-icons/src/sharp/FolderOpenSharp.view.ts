import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FolderOpenSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 6H12l-2-2H2v16h20V6zm-2 12H4V8h16v10z\"/>")
      .name("FolderOpenSharp")
  }
}

export default FolderOpenSharp as any as Typed<DLightIconType>
