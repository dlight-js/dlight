import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class CompassCalibrationFilled {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<circle cx=\"12\" cy=\"17\" r=\"4\"/><path d=\"M12 10.07c1.95 0 3.72.79 5 2.07l5-5C19.44 4.59 15.9 3 12 3S4.56 4.59 2 7.15l5 5a7.06 7.06 0 0 1 5-2.08z\"/>")
      .name("CompassCalibrationFilled")
  }
}

export default CompassCalibrationFilled as Pretty as Typed<DLightIconType, HTMLSpanElement>
