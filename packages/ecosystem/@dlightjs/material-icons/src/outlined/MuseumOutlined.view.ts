import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class MuseumOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M22 11V9L12 2 2 9v2h2v9H2v2h20v-2h-2v-9h2zm-4 9H6V9h12v11z\"/><path d=\"m10 14 2 3 2-3v4h2v-7h-2l-2 3-2-3H8v7h2z\"/>")
      .name("MuseumOutlined")
  }
}

export default MuseumOutlined as any as Typed<DLightIconType>
