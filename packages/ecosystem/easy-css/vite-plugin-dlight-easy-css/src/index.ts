// @ts-ignore
import { transform } from "@babel/core"
import easyCss, { type DLightOption } from "babel-preset-dlight-easy-css"
import { minimatch } from "minimatch"

export default function(options: DLightOption = {}) {
  const {
    files: preFiles = "**/*.{js,jsx,ts,tsx}",
    excludeFiles: preExcludeFiles = "**/{dist,node_modules,lib}/*.{js,ts}"
  } = options
  const files = Array.isArray(preFiles) ? preFiles : [preFiles]
  const excludeFiles = Array.isArray(preExcludeFiles) ? preExcludeFiles : [preExcludeFiles]

  return {
    name: "DlightEasyCss",
    enforce: "pre",
    transform(code: string, id: string) {
      let enter = false
      for (const allowedPath of files) {
        if (minimatch(id, allowedPath)) {
          enter = true
          break
        }
      }
      for (const notAllowedPath of excludeFiles) {
        if (minimatch(id, notAllowedPath)) {
          enter = false
          break
        }
      }
      if (!enter) return
      return transform(code, {
        babelrc: false,
        configFile: false,
        presets: [[easyCss, options]],
        sourceMaps: true,
        filename: id
      })
    }
  } as any
}
