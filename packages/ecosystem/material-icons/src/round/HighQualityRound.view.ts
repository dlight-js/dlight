import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class HighQualityRound {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8.75 11c-.41 0-.75-.34-.75-.75V13h-2v1.25c0 .41-.34.75-.75.75S6 14.66 6 14.25v-4.5c0-.41.34-.75.75-.75s.75.34.75.75v1.75h2V9.75c0-.41.34-.75.75-.75s.75.34.75.75v4.5c0 .41-.34.75-.75.75zM18 14c0 .55-.45 1-1 1h-.75v.75c0 .41-.34.75-.75.75s-.75-.34-.75-.75V15H14c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v4zm-3.5-.5h2v-3h-2v3z\"/>")
      .name("HighQualityRound")
  }
}

export default HighQualityRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
