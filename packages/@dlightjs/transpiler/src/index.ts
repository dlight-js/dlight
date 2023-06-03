// @ts-ignore
import { transform } from "@babel/core"

export default function transformDLight(code: string) {
  return transform(code, {
    presets: ["babel-preset-dlight"]
  }).code
}
