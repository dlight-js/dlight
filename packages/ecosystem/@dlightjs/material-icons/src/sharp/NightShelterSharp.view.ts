import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class NightShelterSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 3 4 9v12h16V9l-8-6zm-2.25 9.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM17 18h-1v-1.5H8V18H7v-7h1v4.5h3.5V12H17v6z\"/>")
      .name("NightShelterSharp")
  }
}

export default NightShelterSharp as any as Typed<DLightIconType>
