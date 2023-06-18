import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PhotoAlbumTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16 4v7l-2.5-1.5L11 11V4H6v16h12V4h-2zM7 18l2.38-3.17L11 17l2.62-3.5L17 18H7z\" opacity=\".3\"/><path d=\"M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H6V4h5v7l2.5-1.5L16 11V4h2v16zm-4.38-6.5L17 18H7l2.38-3.17L11 17l2.62-3.5z\"/>")
      .name("PhotoAlbumTwoTone")
  }
}

export default PhotoAlbumTwoTone as any as Typed<DLightIconType>
