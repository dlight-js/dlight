// @ts-ignore
import { transform } from "@babel/core"
import dlight from "babel-preset-dlight"

export default function transformDLight(code: string) {
  return transform(code, {
    presets: [dlight]
  }).code
}
