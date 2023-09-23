import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class SentimentVeryDissatisfiedRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 13.5c-2.03 0-3.8 1.11-4.75 2.75-.19.33.06.75.44.75h8.62c.38 0 .63-.42.44-.75A5.489 5.489 0 0 0 12 13.5zm-3.65-2.03.53-.53.53.53c.29.29.77.29 1.06 0 .29-.29.29-.77 0-1.06l-.53-.53.53-.53c.29-.29.29-.77 0-1.06a.754.754 0 0 0-1.06 0l-.53.53-.53-.53a.754.754 0 0 0-1.06 0c-.29.29-.29.77 0 1.06l.53.53-.53.53c-.29.29-.29.77 0 1.06.29.29.77.29 1.06 0zM11.99 2C6.47 2 2 6.47 2 12s4.47 10 9.99 10S22 17.53 22 12 17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.65-11.71-.53.53-.53-.53a.754.754 0 0 0-1.06 0c-.29.29-.29.77 0 1.06l.53.53-.53.53c-.29.29-.29.77 0 1.06.29.29.77.29 1.06 0l.53-.53.53.53c.29.29.77.29 1.06 0 .29-.29.29-.77 0-1.06l-.53-.53.53-.53c.29-.29.29-.77 0-1.06a.754.754 0 0 0-1.06 0z\"/>")
      .name("SentimentVeryDissatisfiedRound")
  }
}

export default SentimentVeryDissatisfiedRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
