import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import { ForwardProp } from "@dlightjs/decorators"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

@View
@ForwardProp
class InterpreterModeTwoTone {
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M15.52 15.01C15.35 15 15.18 15 15 15c-2.37 0-4.29.73-5.48 1.34-.32.16-.52.5-.52.88V18h7.17c-.43-.74-.77-1.76-.65-2.99zM13 8c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2z\" opacity=\".3\"/><path d=\"M20.5 16.5c-.83 0-1.5-.67-1.5-1.5v-2.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V15c0 .83-.67 1.5-1.5 1.5zM20 20h1v-1.54c1.69-.24 3-1.7 3-3.46h-1a2.5 2.5 0 0 1-5 0h-1c0 1.76 1.31 3.22 3 3.46V20zM9 12c-2.21 0-4-1.79-4-4a3.999 3.999 0 0 1 5.34-3.77A5.938 5.938 0 0 0 9 8c0 1.43.5 2.74 1.34 3.77-.42.15-.87.23-1.34.23zm-1.89 1.13A4.965 4.965 0 0 0 5 17.22V20H1v-2.78c0-1.12.61-2.15 1.61-2.66 1.24-.64 2.76-1.19 4.5-1.43zM11 8c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4zm2 0c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zm2 7c-2.37 0-4.29.73-5.48 1.34-.32.16-.52.5-.52.88V18h7.17c.5.86 1.25 1.56 2.15 2H7v-2.78c0-1.12.61-2.15 1.61-2.66C10.29 13.7 12.47 13 15 13c.39 0 .77.02 1.14.05-.33.59-.55 1.26-.62 1.96-.17-.01-.34-.01-.52-.01z\"/>")
      .name("InterpreterModeTwoTone")
  }
}

export default InterpreterModeTwoTone as Pretty as Typed<DLightIconType, HTMLSpanElement>
