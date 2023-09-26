import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ChromeReaderModeSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M13 12h7v1.5h-7V12zm0-2.5h7V11h-7V9.5zm0 5h7V16h-7v-1.5zM23 4H1v17h22V4zm-2 15h-9V6h9v13z\"/>")
      .name("ChromeReaderModeSharp")
  }
}

export default ChromeReaderModeSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
