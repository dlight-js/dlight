import { View } from "@dlightjs/dlight"
import { type Typed, type Pretty } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class MinorCrashRound extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M19.5 24c.82 0 1.5-.67 1.5-1.5v-7.16c0-.22-.04-.45-.11-.66l-1.97-5.67C18.72 8.42 18.16 8 17.5 8h-11c-.66 0-1.21.42-1.42 1.01l-1.97 5.67c-.07.21-.11.43-.11.66v7.16c0 .83.68 1.5 1.5 1.5S6 23.33 6 22.5V22h12v.5c0 .83.67 1.5 1.5 1.5zM6.85 10h10.29l1.04 3H5.81l1.04-3zM6 17.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S8.33 19 7.5 19 6 18.33 6 17.5zm9 0c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5zM8.71 5.71a.996.996 0 0 1-1.41 0L5.71 4.12a.996.996 0 1 1 1.41-1.41L8.71 4.3c.39.38.39 1.02 0 1.41zm9.58-3c.39.39.39 1.02 0 1.41L16.7 5.71a.996.996 0 1 1-1.41-1.41l1.59-1.59a.996.996 0 0 1 1.41 0zM12 5c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1s1 .45 1 1v3c0 .55-.45 1-1 1z\"/>")
      .name("MinorCrashRound")
  }
}

export default MinorCrashRound as Pretty as Typed<DLightIconType, HTMLSpanElement>
