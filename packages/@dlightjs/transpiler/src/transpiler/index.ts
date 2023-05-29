import {
  getDecoName,
  pushDep,
  pushDerived,
  shouldBeListened,
  valueWithArrowFunc
} from "./nodeHelper"
import * as t from "@babel/types"
import Transpiler from "./babelTranspiler"
import { handleBody } from "./bodyHandler"
import { resolveProp, resolveState } from "./decoratorResolver"

export function parseDlightFile(sourceFileCode: string) {
  const ast = Transpiler.parse(sourceFileCode)

  let classDeclarationNode: t.ClassDeclaration | null = null
  let classBodyNode: t.ClassBody | null = null
  // ---- 在这里新建node很省时间
  let depsNode: t.ClassProperty | null = null
  let derivedPairNode: t.ClassProperty | null = null
  let properties: string[] = []
  let propertiesContainer: Record<string, {
    node: t.Node
    derivedFrom: string[]
    deco: "Prop" | "Env"
  }> = {}

  function willHandleBodyAtLast(node: any) {
    return classBodyNode!.body.indexOf(node) === classBodyNode!.body.length - 1
  }
  function handleBodyAtLast() {
    const usedProperties = handleBody(classBodyNode!, properties)
    for (const [key, { node, derivedFrom, deco }] of Object.entries(propertiesContainer).reverse()) {
      if (derivedFrom.length > 0) {
        usedProperties.push(...derivedFrom)
        pushDerived(key, derivedFrom, derivedPairNode!, classBodyNode!)
        valueWithArrowFunc(node)
      }
      if (usedProperties.includes(key)) {
        pushDep(key, depsNode!, classBodyNode!)
        resolveState(node as any, classBodyNode!)
      }
      if (deco) {
        resolveProp(node as any, classBodyNode!, deco, key)
      }
    }
  }

  Transpiler.traverse(ast, {
    enter(path: any) {
      const node = path.node as t.ClassDeclaration
      if (t.isClassDeclaration(node) || t.isClassExpression(node)) {
        // ---- 如果是继承View的，新建_$decorators, _$propDerivedPairs
        if (t.isIdentifier(node.superClass, { name: "View" })) {
          classDeclarationNode = node
          classBodyNode = classDeclarationNode.body
          derivedPairNode = t.classProperty(
            t.identifier("_$derivedPairs"),
            t.objectExpression([])
          )
          depsNode = t.classProperty(
            t.identifier("_$deps"),
            t.objectExpression([])
          )
          properties = classBodyNode.body
            .filter(n => t.isClassProperty(n))
            .map(n => (n as any).key.name)
          propertiesContainer = {}
        }
      }
    },
    ClassMethod(path: any) {
      if (!classDeclarationNode) return
      if (willHandleBodyAtLast(path.node)) {
        handleBodyAtLast()
      }
    },
    ClassProperty(path: any) {
      if (!classDeclarationNode) return
      const node = path.node as t.ClassProperty
      const key = (node.key as any).name
      // ---- 要提前判断是不是最后一个，因为后面会赠加
      const willHandleBody = willHandleBodyAtLast(node)

      // ---- 看是不是有属性是 prop derived，有就加一个()=>
      //      同时在propDerived中记录，这会在constructor的调用一遍
      const deps: string[] = []
      path.scope.traverse(node, {
        MemberExpression(innerPath: any) {
          if (properties.includes(innerPath.node.property.name)) {
            if (shouldBeListened(innerPath, classDeclarationNode!)) {
              deps.push(innerPath.node.property.name)
            }
          }
        }
      })

      propertiesContainer[key] = {
        node,
        deco: node.decorators?.map(deco => getDecoName(deco))[0],
        derivedFrom: [...new Set(deps)]
      }
      node.decorators = null
      // ---- 最后处理body
      if (willHandleBody) handleBodyAtLast()
    }
  })

  const returnedCode = Transpiler.generate(ast)
  const newCode = "import * as _$ from '@dlightjs/dlight';\n" + returnedCode

  return newCode
}
