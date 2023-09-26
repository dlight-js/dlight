import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class PersonRemoveFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M14 8c0-2.21-1.79-4-4-4S6 5.79 6 8s1.79 4 4 4 4-1.79 4-4zm3 2v2h6v-2h-6zM2 18v2h16v-2c0-2.66-5.33-4-8-4s-8 1.34-8 4z\"/>")
      .name("PersonRemoveFilled")
  }
}

export default PersonRemoveFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
