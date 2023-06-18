import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class LocalPostOfficeSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 4H2.01v16H22V4zm-2 4-8 5-8-5V6l8 5 8-5v2z\"/>")
      .name("LocalPostOfficeSharp")
  }
}

export default LocalPostOfficeSharp as any as Typed<DLightIconType>
