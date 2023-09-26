import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class OpenInBrowserRound {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 4H5a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h3c.55 0 1-.45 1-1s-.45-1-1-1H5V8h14v10h-3c-.55 0-1 .45-1 1s.45 1 1 1h3c1.1 0 2-.9 2-2V6a2 2 0 0 0-2-2zm-7.35 6.35-2.79 2.79c-.32.32-.1.86.35.86H11v5c0 .55.45 1 1 1s1-.45 1-1v-5h1.79c.45 0 .67-.54.35-.85l-2.79-2.79c-.19-.2-.51-.2-.7-.01z\"/>")
      .name("OpenInBrowserRound")
  }
}

export default OpenInBrowserRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
