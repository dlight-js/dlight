import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class LocalFireDepartmentTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16.2 8.65c-.64.42-1.4.65-2.18.65-2.06 0-3.77-1.55-3.99-3.55C8.13 7.35 6 9.84 6 13c0 1.79.79 3.4 2.04 4.5-.04-.34-.23-1.88 1.13-3.22L12 11.5l2.83 2.78c1.35 1.33 1.17 2.86 1.13 3.21v.01A5.982 5.982 0 0 0 18 13c0-1.65-.66-3.22-1.8-4.35z\" opacity=\".3\"/><path d=\"m12 14.31-1.42 1.4c-.38.36-.58.84-.58 1.35 0 1.07.9 1.94 2 1.94s2-.87 2-1.94c0-.51-.2-.99-.57-1.36L12 14.31z\" opacity=\".3\"/><path d=\"m16 6-.44.55c-.42.52-.98.75-1.54.75C13 7.3 12 6.52 12 5.3V2S4 6 4 13c0 4.42 3.58 8 8 8s8-3.58 8-8c0-2.96-1.61-5.62-4-7zm-4 13c-1.1 0-2-.87-2-1.94 0-.51.2-.99.58-1.36L12 14.3l1.43 1.4c.37.37.57.85.57 1.36 0 1.07-.9 1.94-2 1.94zm3.96-1.5c.04-.36.22-1.89-1.13-3.22L12 11.5l-2.83 2.78C7.81 15.62 8 17.16 8.04 17.5A5.982 5.982 0 0 1 6 13c0-3.16 2.13-5.65 4.03-7.25a4.024 4.024 0 0 0 3.99 3.55c.78 0 1.54-.23 2.18-.66A6.175 6.175 0 0 1 18 13c0 1.79-.79 3.4-2.04 4.5z\"/>")
      .name("LocalFireDepartmentTwoTone")
  }
}

export default LocalFireDepartmentTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
