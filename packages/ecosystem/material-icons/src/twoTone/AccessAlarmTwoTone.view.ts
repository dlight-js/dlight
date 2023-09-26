import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class AccessAlarmTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 6c-3.87 0-7 3.13-7 7s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7zm3.75 10.85L11 14V8h1.5v5.25l4 2.37-.75 1.23z\" opacity=\".3\"/><path d=\"M12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9a9 9 0 0 0 0-18zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm.5-12H11v6l4.75 2.85.75-1.23-4-2.37zM22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86zM7.88 3.39 6.6 1.86 2 5.71l1.29 1.53z\"/>")
      .name("AccessAlarmTwoTone")
  }
}

export default AccessAlarmTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
