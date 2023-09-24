import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class PhoneIphoneSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 1H5v22h13V1zm-6.5 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z\"/>")
      .name("PhoneIphoneSharp")
  }
}

export default PhoneIphoneSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
