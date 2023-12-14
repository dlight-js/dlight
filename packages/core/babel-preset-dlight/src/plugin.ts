import { type PluginObj, type ConfigAPI, type types as t } from "@babel/core"
import { PluginProviderClass } from "./pluginProvider"
import { type DLightOption } from "./types"

export default function(api: ConfigAPI & { types: typeof t, traverse: any }, options: DLightOption): PluginObj {
  const { types, traverse } = api
  console.log("fucl", traverse)
  const {
    files = "**/*.{js,jsx,ts,tsx}",
    excludeFiles = "**/{dist,node_modules,lib}/*.{js,ts}",
    enableDevTools = false,
    htmlTags = defaultHtmlTags => defaultHtmlTags
  } = options

  const pluginProvider = new PluginProviderClass(
    types,
    Array.isArray(files) ? files : [files],
    Array.isArray(excludeFiles) ? excludeFiles : [excludeFiles],
    enableDevTools,
    htmlTags
  )

  return {
    visitor: {
      Program(path, { filename }) {
        return pluginProvider.programVisitor(path, filename)
      },
      ClassDeclaration: {
        enter: pluginProvider.classEnter.bind(pluginProvider),
        exit: pluginProvider.classExit.bind(pluginProvider)
      },
      ClassExpression: {
        enter: pluginProvider.classEnter.bind(pluginProvider),
        exit: pluginProvider.classExit.bind(pluginProvider)
      },
      ClassMethod: pluginProvider.classMethodVisitor.bind(pluginProvider),
      ClassProperty: pluginProvider.classPropertyVisitor.bind(pluginProvider)
    }
  }
}
