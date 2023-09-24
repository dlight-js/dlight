import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ExposurePlus1TwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 18V5h-.3L15 6.7v1.7l3-1.02V18zm-10-1v-4h4v-2h-4V7H8v4H4v2h4v4z\"/>")
      .name("ExposurePlus1TwoTone")
  }
}

export default ExposurePlus1TwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
