import transpiler from "@dlightjs/transpiler"
const transformDLight = (transpiler as any).default

interface DLightPluginOption {
  appendix?: string | string[]
}

export default function(options?: DLightPluginOption) {
  let appendix: any
  if (options) {
    appendix = options.appendix
    if (appendix && !Array.isArray(appendix)) appendix = [appendix]
  }

  return {
    name: "dlight",
    enforce: "pre",
    transform(code: string, id: string) {
      if (!appendix) return transformDLight(code)
      for (const append of appendix) {
        if (id.endsWith(append)) {
          return transformDLight(code)
        }
      }
    }
  } as any
}
