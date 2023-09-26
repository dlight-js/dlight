import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SingleBedRound {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 10V7c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v3c-1.1 0-2 .9-2 2v5h1.33l.51 1.53c.1.28.36.47.66.47a.7.7 0 0 0 .66-.47L7.67 17h8.67l.51 1.53c.09.28.35.47.65.47a.7.7 0 0 0 .66-.47l.51-1.53H20v-5c0-1.1-.9-2-2-2zm-7 0H8V8c0-.55.45-1 1-1h2v3zm5 0h-3V7h2c.55 0 1 .45 1 1v2z\"/>")
      .name("SingleBedRound")
  }
}

export default SingleBedRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
