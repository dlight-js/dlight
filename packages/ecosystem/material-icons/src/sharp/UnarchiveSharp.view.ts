import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class UnarchiveSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18.71 3H5.29L3 5.79V21h18V5.79L18.71 3zM14 15v2h-4v-2H6.5L12 9.5l5.5 5.5H14zM5.12 5l.81-1h12l.94 1H5.12z\"/>")
      .name("UnarchiveSharp")
  }
}

export default UnarchiveSharp as any as Typed<DLightIconType>
