import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ExposurePlus1Sharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M10 7H8v4H4v2h4v4h2v-4h4v-2h-4V7zm10 11h-2V7.38L15 8.4V6.7L19.7 5h.3v13z\"/>")
      .name("ExposurePlus1Sharp")
  }
}

export default ExposurePlus1Sharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
