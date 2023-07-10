import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class GiteTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M4 12h10v5H4v-5zm16 5h-4v-6.17l2-2 2 2V17z\" opacity=\".3\"/><path d=\"M18 6H9V4H7v2H6l-4 4v9h20v-9l-4-4zM4 12h10v5H4v-5zm16 5h-4v-6.17l2-2 2 2V17z\"/>")
      .name("GiteTwoTone")
  }
}

export default GiteTwoTone as any as Typed<DLightIconType>
