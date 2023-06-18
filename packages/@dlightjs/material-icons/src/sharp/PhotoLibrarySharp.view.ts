import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PhotoLibrarySharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 18V2H6v16h16zm-11-6 2.03 2.71L16 11l4 5H8l3-4zM2 6v16h16v-2H4V6H2z\"/>")
      .name("PhotoLibrarySharp")
  }
}

export default PhotoLibrarySharp as any as Typed<DLightIconType>
