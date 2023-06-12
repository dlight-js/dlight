// @ts-ignore
import { transform } from "@babel/core"
import dlight from "babel-preset-dlight"

function transformDLight(code: string, id: string) {
  return transform(code, {
    presets: [dlight],
    sourceMaps: true,
    filename: id
  })
}

interface DLightPluginOption {
  appendix?: string | string[]
}

export default function(options?: DLightPluginOption) {
  let appendix: any
  if (options) {
    appendix = options.appendix ?? [".js", ".ts"]
    if (!Array.isArray(appendix)) appendix = [appendix]
  }

  return {
    name: "dlight",
    enforce: "pre",
    transform(code: string, id: string) {
      if (!appendix) {
        return transformDLight(code, id)
      }
      for (const append of appendix) {
        if (id.endsWith(append)) {
          return transformDLight(code, id)
        }
      }
    }
  } as any
}
