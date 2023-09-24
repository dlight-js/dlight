import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class LightbulbSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm-4-5h8v2H8zm4-15C7.86 2 4.5 5.36 4.5 9.5c0 3.82 2.66 5.86 3.77 6.5h7.46c1.11-.64 3.77-2.68 3.77-6.5C19.5 5.36 16.14 2 12 2z\"/>")
      .name("LightbulbSharp")
  }
}

export default LightbulbSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
