/**
 * Too much scoped statement blocks in official implementation
 */
// @ts-ignore
import { declare } from "@babel/helper-plugin-utils"

function removePlugin(plugins: any[], name: string): void {
  const indices: number[] = []
  plugins.forEach((plugin, i) => {
    const n = Array.isArray(plugin) ? plugin[0] : plugin
    if (n === name) {
      indices.unshift(i)
    }
  })
  for (const i of indices) {
    plugins.splice(i, 1)
  }
}

interface Options {
  disallowAmbiguousJSXLike?: boolean
  dts?: boolean
  isTSX?: boolean
}

export default declare((api: any, opts: Options): any => {
  api.assertVersion(7)
  const { disallowAmbiguousJSXLike, dts } = opts ?? {}
  const { isTSX } = opts ?? {}
  return {
    name: "syntax-typescript",
    manipulateOptions(_opts: any, parserOpts: any) {
      const { plugins } = parserOpts
      removePlugin(plugins, "flow")
      removePlugin(plugins, "jsx")
      plugins.push("objectRestSpread", "classProperties")
      if (isTSX) {
        plugins.push("jsx")
      }
      parserOpts.plugins.push([
        "typescript",
        { disallowAmbiguousJSXLike, dts }
      ])
    }
  }
})
