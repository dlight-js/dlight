import * as t from "@babel/types"
import { handleBody } from "./bodyHandler"
import { resolveState, resolveProp, resolveDefault, resolveChildren } from "./decoratorResolver"
import { bindMethods, isDLightView, pushDerived, shouldBeListened, valueWithArrowFunc } from "./nodeHelper"
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
}

export default function(api: any, options: DLightOption) {
  const {
    files: preFiles = "**/*.{js,jsx,ts,tsx}",
    excludeFiles: preExcludeFiles = "**/{dist,node_modules,lib}/*.{js,ts}"
  } = options
  const files = Array.isArray(preFiles) ? preFiles : [preFiles]
  const excludeFiles = Array.isArray(preExcludeFiles) ? preExcludeFiles : [preExcludeFiles]

  let classDeclarationNode: t.ClassDeclaration | null = null
  let classBodyNode: t.ClassBody | null = null
  // ---- 在这里新建node很省时间
  let derivedPairNode: t.ClassProperty | null = null
  let properties: string[] = []
  let propertiesContainer: Record<string, {
    node: t.ClassProperty
    derivedFrom: string[]
    isStatic: boolean
    isDefault: boolean
    isChildren: boolean
    propOrEnv: "Prop" | "Env" | undefined
  }> = {}
  let staticProperties: string[] = []
  let methodsToBind: string[] = []
  let rootPath: any

  function handleBodyAtLast() {
    const usedProperties = handleBody(
      classBodyNode!,
      properties.filter(p => !staticProperties.includes(p)),
      rootPath
    )

    const defaultPropKey = Object.entries(propertiesContainer)
      .find(([, { propOrEnv, isDefault }]) => isDefault && propOrEnv === "Prop")?.[0] ?? ""

    for (let [key, { node, derivedFrom, isStatic, isChildren, propOrEnv }] of Object.entries(propertiesContainer).reverse()) {
      if (!node.value) node.value = t.identifier("undefined")
      if (isChildren) {
        resolveChildren(node as any, classBodyNode!, key)
        continue
      }
      if (derivedFrom.length !== 0) {
        derivedFrom = derivedFrom.filter(k => !staticProperties.includes(k))
        usedProperties.push(...derivedFrom)
        pushDerived(key, derivedFrom, derivedPairNode!, classBodyNode!)
        valueWithArrowFunc(node)
      }
      if (propOrEnv) {
        resolveProp(node as any, classBodyNode!, propOrEnv, key)
        if (defaultPropKey === key) resolveDefault(node as any, classBodyNode!, key)
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
        const name = path.node.key.name
        if (name === "Body") return
        const isSubView = path.node.decorators?.find((d: t.Decorator) => t.isIdentifier(d.expression) && d.expression.name === "View")
        if (isSubView) return
        methodsToBind.push(name)
      },
      ClassProperty(path: any) {
        if (!this.enter) return
        if (!classDeclarationNode) return
        const node = path.node as t.ClassProperty
        const key = (node.key as any).name
        if (key === "Body") return
        const availableDecoNames = ["Static", "Prop", "Env", "Default", "Children"]
        const decoNames = node.decorators?.filter(deco => (
          t.isIdentifier(deco.expression) && availableDecoNames.includes(deco.expression.name)
        )).map(deco => (deco.expression as any).name) ?? []
        if (decoNames.includes("View")) return
        // ---- 看是不是有属性是 prop derived，有就加一个()=>
        //      同时在propDerived中记录，这会在constructor的调用一遍
        //      不管@prop和@env
        const deps: string[] = []
        if (!(decoNames.includes("Prop") || decoNames.includes("Env"))) {
          path.scope.traverse(node, {
            MemberExpression(innerPath: any) {
              if (properties.includes(innerPath.node.property.name) && t.isThisExpression(innerPath.node.object)) {
                if (shouldBeListened(innerPath, classDeclarationNode!)) {
                  deps.push(innerPath.node.property.name)
                }
              }
            }
          })
        }

        propertiesContainer[key] = {
          node,
          isStatic: decoNames.includes("Static"),
          isDefault: decoNames.includes("Default"),
          isChildren: decoNames.includes("Children"),
          propOrEnv: decoNames.includes("Prop") ? "Prop" : decoNames.includes("Env") ? "Env" : undefined,
          derivedFrom: [...new Set(deps)]
        }
        node.decorators = node.decorators?.filter(deco => !(
          t.isIdentifier(deco.expression) && availableDecoNames.includes(deco.expression.name)
        ))
      }
    }
  }
}
