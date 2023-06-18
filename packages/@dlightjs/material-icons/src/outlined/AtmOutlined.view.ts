import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class AtmOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M8 9v1.5h2.25V15h1.5v-4.5H14V9H8zM6 9H3c-.55 0-1 .45-1 1v5h1.5v-1.5h2V15H7v-5c0-.55-.45-1-1-1zm-.5 3h-2v-1.5h2V12zM21 9h-4.5c-.55 0-1 .45-1 1v5H17v-4.5h1V14h1.5v-3.51h1V15H22v-5c0-.55-.45-1-1-1z\"/>")
      .name("AtmOutlined")
  }
}

export default AtmOutlined as any as Typed<DLightIconType>
