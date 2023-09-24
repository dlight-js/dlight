import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class EnergySavingsLeafSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 3c-4.8 0-9 3.86-9 9 0 2.12.74 4.07 1.97 5.61L3 19.59 4.41 21l1.97-1.97A9.012 9.012 0 0 0 12 21c2.3 0 4.61-.88 6.36-2.64A8.95 8.95 0 0 0 21 12V3h-9zm-1.5 14-.5-.5 2.5-3.5-5-.5 6-5.5.5.5-2.5 3.5 5 .5-6 5.5z\"/>")
      .name("EnergySavingsLeafSharp")
  }
}

export default EnergySavingsLeafSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
