import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class FileCopySharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16 1H2v16h2V3h12V1zm-1 4 6 6v12H6V5h9zm-1 7h5.5L14 6.5V12z\"/>")
      .name("FileCopySharp")
  }
}

export default FileCopySharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
