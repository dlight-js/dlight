import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class PlaylistAddSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M14 10H3v2h11v-2zm0-4H3v2h11V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM3 16h7v-2H3v2z\"/>")
      .name("PlaylistAddSharp")
  }
}

export default PlaylistAddSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
