import easyCss from "babel-preset-easy-css"
import dlightEasyCss from "./plugin"
import atomic from "@iandx/easy-css-atomic"
import utility from "@iandx/easy-css-utility"

export default function() {
  const options = {
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
