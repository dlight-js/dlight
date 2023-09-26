import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class LaptopWindowsSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 18v-1h1.99L22 3H2v14h2v1H0v2h24v-2h-4zM4 5h16v10H4V5z\"/>")
      .name("LaptopWindowsSharp")
  }
}

export default LaptopWindowsSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
