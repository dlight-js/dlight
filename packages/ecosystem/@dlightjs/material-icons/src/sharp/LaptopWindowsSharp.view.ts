import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class LaptopWindowsSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 18v-1h1.99L22 3H2v14h2v1H0v2h24v-2h-4zM4 5h16v10H4V5z\"/>")
      .name("LaptopWindowsSharp")
  }
}

export default LaptopWindowsSharp as any as Typed<DLightIconType>
