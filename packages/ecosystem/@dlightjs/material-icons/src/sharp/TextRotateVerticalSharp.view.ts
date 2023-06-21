import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class TextRotateVerticalSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15.75 5h-1.5L9.5 16h2.1l.9-2.2h5l.9 2.2h2.1L15.75 5zm-2.62 7L15 6.98 16.87 12h-3.74zM6 20l3-3H7V4H5v13H3l3 3z\"/>")
      .name("TextRotateVerticalSharp")
  }
}

export default TextRotateVerticalSharp as any as Typed<DLightIconType>
