import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class Crop32Sharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21 6H3v12h18V6zm-2 10H5V8h14v8z\"/>")
      .name("Crop32Sharp")
  }
}

export default Crop32Sharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
