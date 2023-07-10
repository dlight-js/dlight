import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ViewModuleSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M14.67 5v6.5H9.33V5h5.34zm1 6.5H21V5h-5.33v6.5zm-1 7.5v-6.5H9.33V19h5.34zm1-6.5V19H21v-6.5h-5.33zm-7.34 0H3V19h5.33v-6.5zm0-1V5H3v6.5h5.33z\"/>")
      .name("ViewModuleSharp")
  }
}

export default ViewModuleSharp as any as Typed<DLightIconType>
