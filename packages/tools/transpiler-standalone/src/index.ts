import * as babel from "@babel/standalone"
import dlight from "babel-preset-dlight"

export default function transformDLight(code: string) {
  return babel.transform(code, {
    presets: [[dlight, { files: "*" }]],
  }).code
}
