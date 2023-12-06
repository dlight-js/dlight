import { type PluginObj, type ConfigAPI, type types as t } from "@babel/core"
import { PluginProvider } from "./pluginProvider"
import { type DLightOption } from "./types"

export default function(api: ConfigAPI & { types: typeof t }, options: DLightOption): PluginObj {
  const { types } = api
  const {
    files = "**/*.{js,jsx,ts,tsx}",
    excludeFiles = "**/{dist,node_modules,lib}/*.{js,ts}",
    enableDevTools = false
  } = options

  const pluginProvider = new PluginProvider(
    types,
    Array.isArray(files) ? files : [files],
    Array.isArray(excludeFiles) ? excludeFiles : [excludeFiles],
    enableDevTools
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
