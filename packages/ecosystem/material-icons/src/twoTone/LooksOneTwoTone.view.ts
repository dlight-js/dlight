import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class LooksOneTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 5H5v14h14V5zm-5 12h-2V9h-2V7h4v10z\" opacity=\".3\"/><path d=\"M5 21h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2zM5 5h14v14H5V5zm5 4h2v8h2V7h-4z\"/>")
      .name("LooksOneTwoTone")
  }
}

export default LooksOneTwoTone as any as Typed<DLightIconType>
