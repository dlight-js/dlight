import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class ChromeReaderModeOutlined {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM3 19V6h8v13H3zm18 0h-8V6h8v13zm-7-9.5h6V11h-6zm0 2.5h6v1.5h-6zm0 2.5h6V16h-6z\"/>")
      .name("ChromeReaderModeOutlined")
  }
}

export default ChromeReaderModeOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
