import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class Man3Sharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16 7H8v8h2v7h4v-7h2zm-4-5.249L14.248 4 12 6.248 9.75 4z\"/>")
      .name("Man3Sharp")
  }
}

export default Man3Sharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
