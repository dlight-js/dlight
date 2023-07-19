import easyCss from "babel-preset-easy-css"
import dlightEasyCss from "./plugin"
import atomic from "@iandx/easy-css-atomic"
import utility from "@iandx/easy-css-utility"

export interface DLightOption {
  /**
   * Files that will be included
   * @default ** /*.{js,jsx,ts,tsx}
   */
  files?: string | string[]
  /**
   * Files that will be excludes
   * @default ** /{dist,node_modules,lib}/*.{js,ts}
   */
  excludeFiles?: string | string[]
}

export default function(api: any, dlOptions: DLightOption) {
  const options = {
    ...dlOptions,
    utilities: [{
      easyFuncMap: atomic,
      safeName: "dlightEasyCssAtomic"
    }, {
      easyFuncMap: utility,
      safeName: "dlightEasyCssUtility"
    }],
    easyCssAlias: "@dlightjs/easy-css"
  }
  return {
    presets: [[easyCss, options]],
    plugins: [[dlightEasyCss, options]]
  }
}
