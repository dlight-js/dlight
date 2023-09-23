import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class Brightness3Round extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M8.93 2h-.14c-.83.02-1.09 1.12-.39 1.56A9.994 9.994 0 0 1 13.03 12c0 3.55-1.84 6.66-4.62 8.43-.71.46-.43 1.55.41 1.57h.21c6.05 0 10.86-5.39 9.87-11.63-.76-4.84-5.07-8.42-9.97-8.37z\"/>")
      .name("Brightness3Round")
  }
}

export default Brightness3Round as Pretty as Typed<DLightIconType, HTMLSpanElement>
