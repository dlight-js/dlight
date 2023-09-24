import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class NearMeTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m11.39 12.61.32.83 1.32 3.42 4.24-10.13-10.13 4.24 3.42 1.33z\" opacity=\".3\"/><path d=\"m3 11.51 6.84 2.65L12.48 21h.98L21 3 3 10.53v.98zm14.27-4.78-4.24 10.13-1.32-3.42-.32-.83-.82-.32-3.43-1.33 10.13-4.23z\"/>")
      .name("NearMeTwoTone")
  }
}

export default NearMeTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
