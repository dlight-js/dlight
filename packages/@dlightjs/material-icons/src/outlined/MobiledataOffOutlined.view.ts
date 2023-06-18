import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class MobiledataOffOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m16 6.82 1.59 1.59L19 7l-4-4-4 4 1.41 1.41L14 6.82v4.35l2 2zM1.39 4.22 8 10.83v6.35l-1.59-1.59L5 17l4 4 4-4-1.41-1.41L10 17.18v-4.35l9.78 9.78 1.41-1.42L2.81 2.81z\"/>")
      .name("MobiledataOffOutlined")
  }
}

export default MobiledataOffOutlined as any as Typed<DLightIconType>
