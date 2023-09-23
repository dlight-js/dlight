import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class NightShelterOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m12 5.5 6 4.5v9H6v-9l6-4.5M12 3 4 9v12h16V9l-8-6zm3 9h-3.5v3.5H8V11H7v7h1v-1.5h8V18h1v-4c0-1.1-.9-2-2-2zm-5.25.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5z\"/>")
      .name("NightShelterOutlined")
  }
}

export default NightShelterOutlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
