import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PlaylistAddCheckOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M3 10h11v2H3zm0-4h11v2H3zm0 8h7v2H3zm17.59-2.07-4.25 4.24-2.12-2.12-1.41 1.41L16.34 19 22 13.34z\"/>")
      .name("PlaylistAddCheckOutlined")
  }
}

export default PlaylistAddCheckOutlined as any as Typed<DLightIconType>
