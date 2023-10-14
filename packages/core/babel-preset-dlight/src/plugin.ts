import * as t from "@babel/types"
import { handleBody } from "./bodyHandler"
import { resolveState, resolveProp, resolveContent, resolveChildren, resolveWatch } from "./decoratorResolver"
import { bindMethods, eliminateLoopDeps, getListenDeps, isDLightView, pushDerived, valueWithArrowFunc } from "./nodeHelper"
import { minimatch } from "minimatch"

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

type PropertyContainer = Record<string, {
  node: t.ClassProperty | t.ClassMethod
  derivedFrom: string[]
  assignDeps: string[]
  isStatic?: boolean
  isContent?: boolean
  isChildren?: boolean
  isWatcher?: boolean
  propOrEnv?: "Prop" | "Env"
}>

export default function(api: any, options: DLightOption) {
  const {
    files: preFiles = "**/*.{js,jsx,ts,tsx}",
    excludeFiles: preExcludeFiles = "**/{dist,node_modules,lib}/*.{js,ts}",
    enableDevTools = false
  } = options
  const files = Array.isArray(preFiles) ? preFiles : [preFiles]
  const excludeFiles = Array.isArray(preExcludeFiles) ? preExcludeFiles : [preExcludeFiles]
  const isDev = (process.env.NODE_ENV === "development") && enableDevTools

  let classDeclarationNode: t.ClassDeclaration | null = null
  let classBodyNode: t.ClassBody | null = null
  // ---- 在这里新建node很省时间
  let derivedPairNode: t.ClassProperty | null = null
  let properties: string[] = []
  let propertiesContainer: PropertyContainer = {}
  let staticProperties: string[] = []
  let methodsToBind: string[] = []
  let rootPath: any

  function handleBodyAtLast() {
    const usedProperties = handleBody(
      classBodyNode!,
      properties.filter(p => !staticProperties.includes(p)),
      rootPath
    )

    const contentPropKey = Object.entries(propertiesContainer)
      .find(([, { propOrEnv, isContent }]) => isContent && propOrEnv === "Prop")?.[0] ?? ""

    const propertyArr = Object.entries(propertiesContainer).reverse()

    for (const [key, { node, derivedFrom, assignDeps, isStatic, isChildren, propOrEnv, isWatcher }] of propertyArr) {
      if (t.isClassProperty(node) && !node.value) node.value = t.identifier("undefined")
      if (isChildren) {
        resolveChildren(node as any, classBodyNode!, key)
        continue
      }
      if (derivedFrom.length !== 0) {
        const deps = eliminateLoopDeps(derivedPairNode!, derivedFrom, assignDeps, staticProperties)
        usedProperties.push(...deps)
        pushDerived(key, deps, derivedPairNode!, classBodyNode!)
        if (isWatcher) resolveWatch(node as t.ClassMethod, classBodyNode!, key)
        else valueWithArrowFunc(node)
      }
      if (propOrEnv) {
        resolveProp(node as any, classBodyNode!, propOrEnv, key)
        if (contentPropKey === key) resolveContent(node as any, classBodyNode!, key)
      }
      if (isStatic) continue
      if (usedProperties.includes(key)) {
        resolveState(node as any, classBodyNode!)
      }
    }
    bindMethods(classBodyNode!, methodsToBind)
    clearNode()
  }
  function initNode(path: any) {
    const node: t.ClassDeclaration | t.ClassDeclaration = path.node
    classDeclarationNode = node
    classBodyNode = node.body
    derivedPairNode = t.classProperty(
      t.identifier("_$derivedPairs"),
      t.objectExpression([])
    )
    properties = classBodyNode.body
      .filter(n => t.isClassProperty(n))
      .map(n => (n as any).key.name)
    staticProperties = classBodyNode.body
      .filter(n => {
        if (!t.isClassProperty(n)) return false
        const decoNames = n.decorators?.map(d => (d.expression as any).name) ?? []
        return decoNames.includes("Static") || decoNames.includes("Children")
      })
      .map(n => (n as any).key.name)
    propertiesContainer = {}
    rootPath = path

    if (isDev) {
      const compName = t.classProperty(
        t.identifier("_$compName"),
        t.stringLiteral(node.id.name)
      )
      classBodyNode.body.unshift(compName)
    }

    this.addDLightImport()
  }
  function clearNode() {
    classDeclarationNode = null
    classBodyNode = null
    derivedPairNode = null
    properties = []
    staticProperties = []
    methodsToBind = []
    propertiesContainer = {}
  }

  return {
    visitor: {
      Program(path: any, state: any) {
        if (state.filename) {
          for (const allowedPath of files) {
            if (minimatch(state.filename, allowedPath)) {
              this.enter = true
              break
            }
          }
          for (const notAllowedPath of excludeFiles) {
            if (minimatch(state.filename, notAllowedPath)) {
              this.enter = false
              break
            }
          }
        } else {
          this.enter = true
        }
        this.didAddDLightImport = false
        const allImports: t.ImportDeclaration[] = path.node.body.filter(t.isImportDeclaration)
        const dlightImports = allImports.filter(n => n.source.value === "@dlightjs/dlight")
        if (dlightImports.length === 0) this.enter = false
        if (isDev) {
          for (const dlightImport of dlightImports) {
            dlightImport.source.value = "@dlightjs/dlight-dev"
          }
        }
        this.addDLightImport = () => {
          if (this.didAddDLightImport || dlightImports.length === 0) return
          let alreadyDeclared = false
          for (const dlightImport of dlightImports) {
            if (dlightImport.specifiers.find(n => t.isImportDefaultSpecifier(n))) {
              alreadyDeclared = true
              break
            }
          }
          if (!alreadyDeclared) {
            dlightImports[0].specifiers.unshift(
              t.importDefaultSpecifier(t.identifier("DLight"))
            )
          }
          this.didAddDLightImport = true
        }
      },
      ClassDeclaration: {
        enter(path: any) {
          if (!this.enter) return
          if (!isDLightView(path)) return
          initNode.call(this, path)
        },
        exit(path: any) {
          if (!this.enter) return
          if (!isDLightView(path)) return
          handleBodyAtLast()
        }
      },
      ClassExpression: {
        enter(path: any) {
          if (!this.enter) return
          if (!isDLightView(path)) return
          initNode.call(this, path)
        },
        exit(path: any) {
          if (!this.enter) return
          if (!isDLightView(path)) return
          handleBodyAtLast()
        }
      },
      ClassMethod(path: any) {
        if (!this.enter) return
        if (!classDeclarationNode) return
        if (!t.isIdentifier(path.node.key)) return
        const node: t.ClassMethod = path.node
        const key = path.node.key.name
        if (key === "Body") return
        methodsToBind.push(key)
        const isSubView = node.decorators?.find((d: t.Decorator) => t.isIdentifier(d.expression) && d.expression.name === "View")
        if (isSubView) return
        // --- @Watch
        const findWatcher = (d: t.Decorator) => (
          t.isIdentifier(d.expression) && d.expression.name === "Watch"
        )
        const watcher = node.decorators?.find(findWatcher)
        const findWatcherFunc = (d: t.Decorator) => (
          t.isCallExpression(d.expression) && t.isIdentifier(d.expression.callee) && d.expression.callee.name === "Watch"
        )
        const watcherFunc = node.decorators?.find(findWatcherFunc)
        if (watcher ?? watcherFunc) {
          let { deps, assignDeps } = getListenDeps(path, node, classDeclarationNode, properties)

          if (watcherFunc) {
            const listenDeps = (watcherFunc.expression as t.CallExpression).arguments[0]
            if (t.isArrayExpression(listenDeps)) {
              deps = listenDeps.elements
                .filter(arg => t.isStringLiteral(arg))
                .map(arg => (arg as t.StringLiteral).value)
            }
          }
          propertiesContainer[key] = {
            node,
            isWatcher: true,
            derivedFrom: [...new Set(deps)],
            assignDeps: [...new Set(assignDeps)]
          }
          node.decorators = node.decorators?.filter(d => !(findWatcher(d) || findWatcherFunc(d)))
        }
      },
      ClassProperty(path: any) {
        if (!this.enter) return
        if (!classDeclarationNode) return
        const node = path.node as t.ClassProperty
        const key = (node.key as any).name
        if (key === "Body") return
        const isSubView = node.decorators?.find(deco => (
          t.isIdentifier(deco.expression) && deco.expression.name === "View")
        )
        if (isSubView) return
        const availableDecoNames = ["Static", "Prop", "Env", "Content", "Children"]
        const decoNames = node.decorators?.filter(deco => (
          t.isIdentifier(deco.expression) && availableDecoNames.includes(deco.expression.name)
        )).map(deco => (deco.expression as any).name) ?? []
        // ---- 看是不是有属性是 prop derived，有就加一个()=>
        //      同时在propDerived中记录，这会在constructor的调用一遍
        //      不管@prop和@env
        let deps: string[] = []
        let assignDeps: string[] = []
        if (!(decoNames.includes("Prop") || decoNames.includes("Env"))) {
          const listens = getListenDeps(path, node, classDeclarationNode, properties)
          deps = listens.deps
          assignDeps = listens.assignDeps
        }

        propertiesContainer[key] = {
          node,
          isStatic: decoNames.includes("Static"),
          isContent: decoNames.includes("Content"),
          isChildren: decoNames.includes("Children"),
          propOrEnv: decoNames.includes("Prop") ? "Prop" : decoNames.includes("Env") ? "Env" : undefined,
          derivedFrom: [...new Set(deps)],
          assignDeps: [...new Set(assignDeps)]
        }
        node.decorators = node.decorators?.filter(deco => !(
          t.isIdentifier(deco.expression) && availableDecoNames.includes(deco.expression.name)
        ))
      }
    }
  }
}
