import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class AddPhotoAlternateSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 7v2.99s-1.99.01-2 0V7h-3s.01-1.99 0-2h3V2h2v3h3v2h-3zm-3 4V8h-3V5H3v16h16V11h-3zM5 19l3-4 2 3 3-4 4 5H5z\"/>")
      .name("AddPhotoAlternateSharp")
  }
}

export default AddPhotoAlternateSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
