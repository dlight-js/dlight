import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class NotInterestedTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zm0-18c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9L7.1 5.69A7.902 7.902 0 0 1 12 4zM5.69 7.1 16.9 18.31A7.902 7.902 0 0 1 12 20c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9z\"/>")
      .name("NotInterestedTwoTone")
  }
}

export default NotInterestedTwoTone as any as Typed<DLightIconType>
