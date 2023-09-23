import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class PersonAddAltTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<circle cx=\"9\" cy=\"8\" r=\"2\" opacity=\".3\"/><path d=\"M14.48 16.34C13.29 15.73 11.37 15 9 15c-2.37 0-4.29.73-5.48 1.34-.32.16-.52.5-.52.88V18h12v-.78c0-.38-.2-.72-.52-.88z\" opacity=\".3\"/><path d=\"M9 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm11 3V6h-2v3h-3v2h3v3h2v-3h3V9zm-4.61 5.56C13.71 13.7 11.53 13 9 13s-4.71.7-6.39 1.56A2.97 2.97 0 0 0 1 17.22V20h16v-2.78c0-1.12-.61-2.15-1.61-2.66zM15 18H3v-.78c0-.38.2-.72.52-.88C4.71 15.73 6.63 15 9 15c2.37 0 4.29.73 5.48 1.34.32.16.52.5.52.88V18z\"/>")
      .name("PersonAddAltTwoTone")
  }
}

export default PersonAddAltTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
