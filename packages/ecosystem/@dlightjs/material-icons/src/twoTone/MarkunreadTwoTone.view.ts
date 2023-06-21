import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class MarkunreadTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 6H4l8 5zM4 8v10h16V8l-8 5z\" opacity=\".3\"/><path d=\"M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z\"/>")
      .name("MarkunreadTwoTone")
  }
}

export default MarkunreadTwoTone as any as Typed<DLightIconType>
