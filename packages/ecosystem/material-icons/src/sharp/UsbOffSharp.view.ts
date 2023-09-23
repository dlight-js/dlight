import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class UsbOffSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15 8h4v4h-1v2c0 .34-.08.66-.23.94L16 13.17V12h-1V8zm-4 .17 2 2V6h2l-3-4-3 4h2v2.17zM13 16v2.28c.6.34 1 .98 1 1.72 0 1.1-.9 2-2 2s-2-.9-2-2c0-.74.4-1.37 1-1.72V16H8c-1.11 0-2-.89-2-2v-2.28c-.6-.34-1-.98-1-1.72 0-.59.26-1.13.68-1.49L1.39 4.22 2.8 2.81l18.38 18.38-1.41 1.41-6.6-6.6H13zm-2-2v-.17l-2.51-2.51c-.14.16-.31.29-.49.4V14h3z\"/>")
      .name("UsbOffSharp")
  }
}

export default UsbOffSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
