import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class LockClockSharp {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M18 11c.7 0 1.37.1 2 .29V8h-3V6.21c0-2.61-1.91-4.94-4.51-5.19A5.008 5.008 0 0 0 7 6v2H4v14h8.26A6.995 6.995 0 0 1 18 11zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm1.65 7.35L17.5 18.2V15h1v2.79l1.85 1.85-.7.71z\"/>")
      .name("LockClockSharp")
  }
}

export default LockClockSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
