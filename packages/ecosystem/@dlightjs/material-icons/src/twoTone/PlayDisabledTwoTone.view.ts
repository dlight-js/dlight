import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PlayDisabledTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M10 12.83v2.53l1.55-.99z\" opacity=\".3\"/><path d=\"M2.81 2.81 1.39 4.22 8 10.83V19l4.99-3.18 6.78 6.78 1.41-1.41L2.81 2.81zM10 15.36v-2.53l1.55 1.55-1.55.98zM19 12 8 5v.17l8.45 8.45L19 12z\"/>")
      .name("PlayDisabledTwoTone")
  }
}

export default PlayDisabledTwoTone as any as Typed<DLightIconType>
