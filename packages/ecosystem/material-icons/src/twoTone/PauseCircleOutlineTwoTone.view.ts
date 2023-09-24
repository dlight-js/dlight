import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class PauseCircleOutlineTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M13 8h2v8h-2zM9 8h2v8H9zm3 14c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zm0-18c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8z\"/>")
      .name("PauseCircleOutlineTwoTone")
  }
}

export default PauseCircleOutlineTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
