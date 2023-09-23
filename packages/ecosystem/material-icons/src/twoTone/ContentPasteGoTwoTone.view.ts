import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class ContentPasteGoTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M10 17c0-3.31 2.69-6 6-6h3V5h-2v3H7V5H5v14h5v-2z\" opacity=\".3\"/><path d=\"M10 19H5V5h2v3h10V5h2v6h2V5c0-1.1-.9-2-2-2h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h5v-2zm2-16c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z\"/><path d=\"m18.01 13-1.42 1.41 1.58 1.58H12v2h6.17l-1.58 1.59 1.42 1.41 3.99-4z\"/>")
      .name("ContentPasteGoTwoTone")
  }
}

export default ContentPasteGoTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
