import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class TextRotationNoneFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12.75 3h-1.5L6.5 14h2.1l.9-2.2h5l.9 2.2h2.1L12.75 3zm-2.62 7L12 4.98 13.87 10h-3.74zm10.37 8-3-3v2H5v2h12.5v2l3-3z\"/>")
      .name("TextRotationNoneFilled")
  }
}

export default TextRotationNoneFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
