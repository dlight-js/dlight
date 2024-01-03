import type babel from "@babel/core"
import { type PluginObj } from "@babel/core"
import { PluginProviderClass } from "./pluginProvider"
import { type DLightOption } from "./types"
import { defaultAlteredAttrMap, defaultAttributeMap } from "./const"

export default function (api: typeof babel, options: DLightOption): PluginObj {
  const { types } = api
  const {
    files = "**/*.{js,jsx,ts,tsx}",
    excludeFiles = "**/{dist,node_modules,lib}/*.{js,ts}",
    enableDevTools = false,
    htmlTags = defaultHtmlTags => defaultHtmlTags,
    alteredAttrMap = defaultAlteredAttrMap,
    attributeMap = defaultAttributeMap,
  } = options

  const pluginProvider = new PluginProviderClass(
    api,
    types,
    Array.isArray(files) ? files : [files],
    Array.isArray(excludeFiles) ? excludeFiles : [excludeFiles],
    enableDevTools,
    htmlTags,
    attributeMap,
    alteredAttrMap
  )

  return {
    visitor: {
      Program: {
        enter(path, { filename }) {
          return pluginProvider.programEnterVisitor(path, filename)
        },
        exit: pluginProvider.programExitVisitor.bind(pluginProvider),
      },
      ClassDeclaration: {
        enter: pluginProvider.classEnter.bind(pluginProvider),
        exit: pluginProvider.classExit.bind(pluginProvider),
      },
      ClassExpression: {
        enter: pluginProvider.classEnter.bind(pluginProvider),
        exit: pluginProvider.classExit.bind(pluginProvider),
      },
      ClassMethod: pluginProvider.classMethodVisitor.bind(pluginProvider),
      ClassProperty: pluginProvider.classPropertyVisitor.bind(pluginProvider),
    },
  }
}
