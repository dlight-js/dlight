import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class Man3Sharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16 7H8v8h2v7h4v-7h2zm-4-5.249L14.248 4 12 6.248 9.75 4z\"/>")
      .name("Man3Sharp")
  }
}

export default Man3Sharp as any as Typed<DLightIconType>
