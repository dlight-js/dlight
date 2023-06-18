import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class NoteOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16 4H4c-1.1 0-2 .9-2 2v12.01c0 1.1.9 1.99 2 1.99h16c1.1 0 2-.9 2-2v-8l-6-6zM4 18.01V6h11v5h5v7.01H4z\"/>")
      .name("NoteOutlined")
  }
}

export default NoteOutlined as any as Typed<DLightIconType>
