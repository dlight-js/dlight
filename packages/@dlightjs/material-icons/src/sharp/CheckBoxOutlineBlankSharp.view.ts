import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class CheckBoxOutlineBlankSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 5v14H5V5h14m2-2H3v18h18V3z\"/>")
      .name("CheckBoxOutlineBlankSharp")
  }
}

export default CheckBoxOutlineBlankSharp as any as Typed<DLightIconType>
