import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ViewStreamTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19 17H5v-4h14v4zM5 11V7h14v4H5z\" opacity=\".3\"/><path d=\"M3 7v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2zm16 10H5v-4h14v4zM5 11V7h14v4H5z\"/>")
      .name("ViewStreamTwoTone")
  }
}

export default ViewStreamTwoTone as any as Typed<DLightIconType>
