import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class Crop32Round {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z\"/>")
      .name("Crop32Round")
  }
}

export default Crop32Round as Pretty as Typed<DLightIconType, HTMLSpanElement>
