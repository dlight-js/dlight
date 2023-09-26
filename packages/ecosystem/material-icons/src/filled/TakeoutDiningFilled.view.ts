import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class TakeoutDiningFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path fill-rule=\"evenodd\" d=\"M5.26 11h13.48l-.67 9H5.93l-.67-9zm3.76-7h5.95L19 7.38l1.59-1.59L22 7.21 19.21 10H4.79L2 7.21 3.41 5.8 5 7.38 9.02 4z\"/>")
      .name("TakeoutDiningFilled")
  }
}

export default TakeoutDiningFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
