import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class CheckBoxSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 3H3v18h18V3zM10 17l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z\"/>")
      .name("CheckBoxSharp")
  }
}

export default CheckBoxSharp as any as Typed<DLightIconType>
