import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class NoDrinksRound {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20.49 20.49 3.51 3.51A.996.996 0 1 0 2.1 4.92l7.54 7.54L11 14v5H7c-.55 0-1 .45-1 1s.45 1 1 1h10c.32 0 .59-.16.78-.4l1.3 1.3a.996.996 0 1 0 1.41-1.41zM13 19v-3.17L16.17 19H13zM7.83 5l-2-2h13.72c.8 0 1.45.65 1.45 1.45 0 .35-.13.7-.37.96l-5.83 6.56L9.83 7h6.74l1.78-2H7.83z\"/>")
      .name("NoDrinksRound")
  }
}

export default NoDrinksRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
