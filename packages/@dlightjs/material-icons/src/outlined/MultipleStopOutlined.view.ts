import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class MultipleStopOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m17 4 4 4-4 4V9h-4V7h4V4zm-7 3c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zM6 7c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm1 10h4v-2H7v-3l-4 4 4 4v-3zm7 0c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm4 0c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1z\"/>")
      .name("MultipleStopOutlined")
  }
}

export default MultipleStopOutlined as any as Typed<DLightIconType>
