import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class AddHomeFilled extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 11c.7 0 1.37.1 2 .29V9l-8-6-8 6v12h7.68A6.995 6.995 0 0 1 18 11z\"/><path d=\"M18 13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm3 5.5h-2.5V21h-1v-2.5H15v-1h2.5V15h1v2.5H21v1z\"/>")
      .name("AddHomeFilled")
  }
}

export default AddHomeFilled as any as Typed<DLightIconType>