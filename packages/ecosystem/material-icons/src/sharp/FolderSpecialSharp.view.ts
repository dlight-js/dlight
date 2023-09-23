import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FolderSpecialSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 6H12l-2-2H2v16h20V6zm-4.06 11L15 15.28 12.06 17l.78-3.33-2.59-2.24 3.41-.29L15 8l1.34 3.14 3.41.29-2.59 2.24.78 3.33z\"/>")
      .name("FolderSpecialSharp")
  }
}

export default FolderSpecialSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
