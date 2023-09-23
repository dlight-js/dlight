import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class Face3Outlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<circle cx=\"9\" cy=\"13\" r=\"1.25\"/><circle cx=\"15\" cy=\"13\" r=\"1.25\"/><path d=\"M22.91 11.96C22.39 6.32 17.66 2 12 2S1.61 6.32 1.09 11.96l-.9 9.86c-.1 1.17.82 2.18 2 2.18h19.62c1.18 0 2.1-1.01 1.99-2.18l-.89-9.86zM13 4.07c2.26.28 4.22 1.51 5.49 3.28-.58.4-1.26.65-1.99.65C14.57 8 13 6.43 13 4.5v-.43zm-2 0v.43C11 6.43 9.43 8 7.5 8c-.73 0-1.41-.25-1.99-.65 1.27-1.77 3.23-3 5.49-3.28zM4.54 9.13c.87.55 1.89.87 2.96.87 1.86 0 3.5-.93 4.5-2.35C13 9.07 14.64 10 16.5 10c1.07 0 2.09-.32 2.96-.87.34.89.54 1.86.54 2.87 0 4.41-3.59 8-8 8s-8-3.59-8-8c0-1.01.2-1.98.54-2.87zM12 22H2.19l.56-6.2C4.25 19.44 7.82 22 12 22s7.75-2.56 9.25-6.2l.56 6.2H12z\"/>")
      .name("Face3Outlined")
  }
}

export default Face3Outlined as Pretty as Typed<DLightIconType, HTMLSpanElement>
