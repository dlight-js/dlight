import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class Rotate90DegreesCwSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M4.64 19.37c3.03 3.03 7.67 3.44 11.15 1.25l-1.46-1.46c-2.66 1.43-6.04 1.03-8.28-1.21a7.007 7.007 0 0 1 0-9.9C7.42 6.69 9.21 6.03 11 6.03V9l4-4-4-4v3.01c-2.3 0-4.61.87-6.36 2.63-3.52 3.51-3.52 9.21 0 12.73z\"/><path d=\"m17 7-6 6 6 6 6-6-6-6z\"/>")
      .name("Rotate90DegreesCwSharp")
  }
}

export default Rotate90DegreesCwSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
