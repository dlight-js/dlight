import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class DownloadForOfflineRound {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm-1 8V7c0-.55.45-1 1-1s1 .45 1 1v3h1.79c.45 0 .67.54.35.85l-2.79 2.79c-.2.2-.51.2-.71 0l-2.79-2.79a.5.5 0 0 1 .36-.85H11zm5 7H8c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1z\"/>")
      .name("DownloadForOfflineRound")
  }
}

export default DownloadForOfflineRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
