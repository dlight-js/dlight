import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class Man3TwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M14 7h-4c-1.1 0-2 .9-2 2v6h2v7h4v-7h2V9c0-1.1-.9-2-2-2zm-2-5.249L14.248 4 12 6.248 9.75 4z\"/>")
      .name("Man3TwoTone")
  }
}

export default Man3TwoTone as any as Typed<DLightIconType>
