import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class BookSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M20 2H4v20h16V2zM6 4h5v8l-2.5-1.5L6 12V4z\"/>")
      .name("BookSharp")
  }
}

export default BookSharp as Pretty as Typed<DLightIconType, HTMLSpanElement>
