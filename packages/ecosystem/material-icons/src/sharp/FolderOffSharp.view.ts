import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class FolderOffSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m12 6-2-2H6.83L22 19.17V6zM2.1 2.1.69 3.51 2 4.83V20h15.17l3.32 3.31 1.41-1.41z\"/>")
      .name("FolderOffSharp")
  }
}

export default FolderOffSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
