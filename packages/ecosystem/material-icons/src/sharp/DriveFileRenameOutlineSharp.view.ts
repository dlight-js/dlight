import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class DriveFileRenameOutlineSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m15 16-4 4h10v-4zm-2.94-8.81L3 16.25V20h3.75l9.06-9.06zm1.072-1.067 2.539-2.539 3.747 3.748L16.88 9.87z\"/>")
      .name("DriveFileRenameOutlineSharp")
  }
}

export default DriveFileRenameOutlineSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
