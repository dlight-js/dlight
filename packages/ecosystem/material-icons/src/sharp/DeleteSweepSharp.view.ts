import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class DeleteSweepSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15 16h4v2h-4v-2zm0-8h7v2h-7V8zm0 4h6v2h-6v-2zM3 20h10V8H3v12zM14 5h-3l-1-1H6L5 5H2v2h12V5z\"/>")
      .name("DeleteSweepSharp")
  }
}

export default DeleteSweepSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
