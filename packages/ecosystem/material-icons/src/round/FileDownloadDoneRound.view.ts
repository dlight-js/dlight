import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class FileDownloadDoneRound {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19.42 4.71a.996.996 0 0 0-1.41 0L9.53 13.2 5.99 9.66a.996.996 0 1 0-1.41 1.41l4.24 4.24c.39.39 1.02.39 1.41 0l9.19-9.19c.4-.39.4-1.02 0-1.41zM6 20h12c.55 0 1-.45 1-1s-.45-1-1-1H6c-.55 0-1 .45-1 1s.45 1 1 1z\"/>")
      .name("FileDownloadDoneRound")
  }
}

export default FileDownloadDoneRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
