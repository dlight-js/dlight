import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SensorWindowTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 4v7h-4v-1h-4v1H6V4h12zM6 20v-7h12v7H6z\" opacity=\".3\"/><path d=\"M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 2v7h-4v-1h-4v1H6V4h12zM6 20v-7h12v7H6z\"/>")
      .name("SensorWindowTwoTone")
  }
}

export default SensorWindowTwoTone as any as Typed<DLightIconType>
