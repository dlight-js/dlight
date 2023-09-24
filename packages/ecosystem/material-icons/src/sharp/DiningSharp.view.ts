import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class DiningSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 2H2v20h20V2zm-11 8.3c0 .93-.64 1.71-1.5 1.93V19H8v-6.77c-.86-.22-1.5-1-1.5-1.93V6h1v3h.75V6h1v3H10V6h1v4.3zm4.58 2.29-.08.03V19H14v-6.38l-.08-.04c-.97-.47-1.67-1.7-1.67-3.18 0-1.88 1.13-3.4 2.5-3.4 1.38 0 2.5 1.53 2.5 3.41 0 1.48-.7 2.71-1.67 3.18z\"/>")
      .name("DiningSharp")
  }
}

export default DiningSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
