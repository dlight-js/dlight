import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class WaterTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M21.98 14H22h-.02zM5.35 13c1.19 0 1.42 1 3.33 1 1.95 0 2.09-1 3.33-1 1.19 0 1.42 1 3.33 1 1.95 0 2.09-1 3.33-1 1.19 0 1.4.98 3.31 1v-2c-1.19 0-1.42-1-3.33-1-1.95 0-2.09 1-3.33 1-1.19 0-1.42-1-3.33-1-1.95 0-2.09 1-3.33 1-1.19 0-1.42-1-3.33-1-1.95 0-2.09 1-3.33 1v2c1.9 0 2.17-1 3.35-1zm13.32 2c-1.95 0-2.09 1-3.33 1-1.19 0-1.42-1-3.33-1-1.95 0-2.1 1-3.34 1-1.24 0-1.38-1-3.33-1-1.95 0-2.1 1-3.34 1v2c1.95 0 2.11-1 3.34-1 1.24 0 1.38 1 3.33 1 1.95 0 2.1-1 3.34-1 1.19 0 1.42 1 3.33 1 1.94 0 2.09-1 3.33-1 1.19 0 1.42 1 3.33 1v-2c-1.24 0-1.38-1-3.33-1zM5.35 9c1.19 0 1.42 1 3.33 1 1.95 0 2.09-1 3.33-1 1.19 0 1.42 1 3.33 1 1.95 0 2.09-1 3.33-1 1.19 0 1.4.98 3.31 1V8c-1.19 0-1.42-1-3.33-1-1.95 0-2.09 1-3.33 1-1.19 0-1.42-1-3.33-1-1.95 0-2.09 1-3.33 1-1.19 0-1.42-1-3.33-1C3.38 7 3.24 8 2 8v2c1.9 0 2.17-1 3.35-1z\"/>")
      .name("WaterTwoTone")
  }
}

export default WaterTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
