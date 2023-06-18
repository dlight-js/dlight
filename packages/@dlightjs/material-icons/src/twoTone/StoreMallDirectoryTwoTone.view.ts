import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class StoreMallDirectoryTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m5.64 9-.6 3h13.92l-.6-3z\" opacity=\".3\"/><path d=\"m4 7-1 5v2h1v6h10v-6h4v6h2v-6h1v-2l-1-5H4zm8 11H6v-4h6v4zm-6.96-6 .6-3h12.72l.6 3H5.04zM4 4h16v2H4z\"/>")
      .name("StoreMallDirectoryTwoTone")
  }
}

export default StoreMallDirectoryTwoTone as any as Typed<DLightIconType>
