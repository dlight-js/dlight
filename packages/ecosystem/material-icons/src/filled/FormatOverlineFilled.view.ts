import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class FormatOverlineFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 3v2H5V3h14zm-7 4c-3.87 0-7 3.13-7 7s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7zm0 11.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 9.5 12 9.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5z\"/>")
      .name("FormatOverlineFilled")
  }
}

export default FormatOverlineFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
