import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SmartScreenSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M1 5v14h22V5H1zm17 12H6V7h12v10z\"/><path d=\"M12.5 11.25H14v1.5h-1.5zm2.5 0h1.5v1.5H15zm-5 0h1.5v1.5H10zm-2.5 0H9v1.5H7.5z\"/>")
      .name("SmartScreenSharp")
  }
}

export default SmartScreenSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
