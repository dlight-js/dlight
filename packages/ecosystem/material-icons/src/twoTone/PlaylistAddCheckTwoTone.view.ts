import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PlaylistAddCheckTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 10h11v2H3zm0-4h11v2H3zm0 8h7v2H3zm17.59-2.07-4.25 4.24-2.12-2.12-1.41 1.41L16.34 19 22 13.34z\"/>")
      .name("PlaylistAddCheckTwoTone")
  }
}

export default PlaylistAddCheckTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
