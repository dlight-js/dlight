import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PauseCircleOutlineTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M13 8h2v8h-2zM9 8h2v8H9zm3 14c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zm0-18c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8z\"/>")
      .name("PauseCircleOutlineTwoTone")
  }
}

export default PauseCircleOutlineTwoTone as any as Typed<DLightIconType>
