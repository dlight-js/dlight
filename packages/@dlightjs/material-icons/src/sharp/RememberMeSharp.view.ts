import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class RememberMeSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 1H5v22h14V1zm-2 14.21c-1.5-.77-3.2-1.21-5-1.21s-3.5.44-5 1.21V6h10v9.21z\"/><circle cx=\"12\" cy=\"10\" r=\"3\"/>")
      .name("RememberMeSharp")
  }
}

export default RememberMeSharp as any as Typed<DLightIconType>
