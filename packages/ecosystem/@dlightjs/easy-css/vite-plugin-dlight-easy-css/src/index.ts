// @ts-ignore
import { transform } from "@babel/core"
import easyCss from "babel-preset-dlight-easy-css"

interface EasyCssOption {
  /**
   * @default [".js", ".ts", ".jsx", ".tsx"]
   */
  appendix?: string[]
}

export default function(options: EasyCssOption = {}) {
  const { appendix = [".js", ".ts", ".jsx", ".tsx"] } = options
  return {
    name: "DlightEasyCss",
    enforce: "pre",
    transform(code: string, id: string) {
      for (const append of appendix) {
        if (id.endsWith(append)) {
          return transform(code, {
            presets: [[easyCss, options]],
            sourceMaps: true,
            filename: id
          })
        }
      }
    }
  } as any
}
