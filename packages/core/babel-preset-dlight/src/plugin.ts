import { PluginProvider } from "./pluginProvider"

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
  /**
   * Enable devtools
   * @default false
   */
  enableDevTools?: boolean
}

export default function(api: any, options: DLightOption) {
  const {
    files = "**/*.{js,jsx,ts,tsx}",
    excludeFiles = "**/{dist,node_modules,lib}/*.{js,ts}",
    enableDevTools = false
  } = options

  const pluginProvider = new PluginProvider(
    Array.isArray(files) ? files : [files],
    Array.isArray(excludeFiles) ? excludeFiles : [excludeFiles],
    enableDevTools
  )

  return {
    visitor: {
      Program: pluginProvider.programVisitor.bind(pluginProvider),
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
