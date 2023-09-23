import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class Brightness3TwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12.7 4.91c1.46 2 2.3 4.46 2.3 7.09s-.84 5.09-2.3 7.09A8 8 0 0 0 17 12a8 8 0 0 0-4.3-7.09z\" opacity=\".3\"/><path d=\"M9 2c-1.05 0-2.05.16-3 .46 4.06 1.27 7 5.06 7 9.54 0 4.48-2.94 8.27-7 9.54.95.3 1.95.46 3 .46 5.52 0 10-4.48 10-10S14.52 2 9 2zm3.7 17.09c1.46-2 2.3-4.46 2.3-7.09s-.84-5.09-2.3-7.09A8 8 0 0 1 17 12a8 8 0 0 1-4.3 7.09z\"/>")
      .name("Brightness3TwoTone")
  }
}

export default Brightness3TwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
