import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class SportsRugbyRound {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20.49 3.51c-.56-.56-2.15-.97-4.16-.97-3.08 0-7.15.96-9.98 3.79-4.69 4.7-4.25 12.74-2.84 14.16.56.56 2.15.97 4.16.97 3.08 0 7.15-.96 9.98-3.79 4.69-4.7 4.25-12.74 2.84-14.16zM7.76 7.76c2.64-2.64 6.35-3.12 8.03-3.19-2.05.94-4.46 2.45-6.61 4.61a23.206 23.206 0 0 0-4.61 6.63c.09-2.48.87-5.74 3.19-8.05zm8.48 8.48c-2.64 2.64-6.35 3.12-8.03 3.19 2.05-.94 4.46-2.45 6.61-4.61 2.16-2.16 3.67-4.58 4.62-6.63-.1 2.48-.88 5.74-3.2 8.05z\"/>")
      .name("SportsRugbyRound")
  }
}

export default SportsRugbyRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
