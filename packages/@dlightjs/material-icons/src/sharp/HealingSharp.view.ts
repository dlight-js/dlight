import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class HealingSharp extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"m17.74 12.01 4.68-4.68-5.75-5.75-4.68 4.68L7.3 1.58 1.55 7.34l4.68 4.69-4.68 4.68 5.75 5.75 4.68-4.68 4.69 4.69 5.76-5.76-4.69-4.7zM12 9c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-4.71 1.96L3.66 7.34l3.63-3.63 3.62 3.62-3.62 3.63zM10 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2 2c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2-4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2.66 9.34-3.63-3.62 3.63-3.63 3.62 3.62-3.62 3.63z\"/>")
      .name("HealingSharp")
  }
}

export default HealingSharp as any as Typed<DLightIconType>
