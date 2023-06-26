import * as t from "@babel/types"
import { css, easyStore, clearStore } from "@iandx/easy-css"

function trimUnderline(str: string) {
  return str.replace(/^_+|_+$/g, "")
}

function toHyphenatedCase(str: string) {
  return trimUnderline(str)
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]/g, "-")
    .replace(/-$/, "")
    .replace(/--+/, "-")
    .toLowerCase()
}

function restorePath(relativePath: string, dirPath: string) {
  const dirArr = dirPath.split("/")
  const fullPathArr = [...dirArr, ...relativePath.split("/")]
  const fullPath = []
  for (const path of fullPathArr) {
    if (path === ".") {
      continue
    } else if (path === "..") {
      fullPath.pop()
    } else {
      fullPath.push(path)
    }
  }
  return fullPath.join("/")
}

interface EasyCssOption {
  entryFile: string
  utilities?: Array<{
    easyFuncMap: Record<string, ((...args: any) => string)>
    safeName?: string
  }>
}

export default function(api: any, { entryFile, utilities }: EasyCssOption) {
  const entryPath = restorePath(entryFile, process.cwd())
  const safeNames = utilities?.map(u => u.safeName).filter(Boolean) ?? []
  const styleListNode = t.arrayExpression()
  const conflictNameStoreNode = t.objectExpression([])
  const nameHashStoreNode = t.objectExpression([])
  const styleHashStoreNode = t.objectExpression([])

  const renewEasyCss = () => {
    styleListNode.elements = easyStore.styleList.map((str: string) => t.stringLiteral(str))
    conflictNameStoreNode.properties = Object.entries(easyStore.conflictNameStore).map(([key, value]: any) => t.objectProperty(
      t.stringLiteral(key),
      t.numericLiteral(value)
    ))
    nameHashStoreNode.properties = Object.entries(easyStore.nameHashStore).map(([key, value]: any) => t.objectProperty(
      t.stringLiteral(key),
      t.stringLiteral(value)
    ))
    styleHashStoreNode.properties = Object.entries(easyStore.styleHashStore).map(([key, value]: any) => t.objectProperty(
      t.stringLiteral(key),
      t.booleanLiteral(value)
    ))
  }

  return {
    visitor: {
      Program: {
        enter(path: any, state: any) {
          if (entryPath === state.filename) {
            // ---- re-enter entry for HMR, so need to reset these stores
            clearStore()
            // ---- node
            const injectBodyNode = t.blockStatement([
              t.expressionStatement(
                t.callExpression(t.identifier("clearStore"), [])
              ),
              t.expressionStatement(
                t.callExpression(t.identifier("inheritEasyStore"), [
                  t.objectExpression([
                    t.objectProperty(t.identifier("styleList"), styleListNode),
                    t.objectProperty(t.identifier("conflictNameStore"), conflictNameStoreNode),
                    t.objectProperty(t.identifier("nameHashStore"), nameHashStoreNode),
                    t.objectProperty(t.identifier("styleHashStore"), styleHashStoreNode)
                  ])
                ])
              ),
              t.expressionStatement(
                t.callExpression(t.identifier("injectListStyle"), [])
              )
            ])
            const injectNode = t.expressionStatement(
              t.callExpression(
                t.arrowFunctionExpression([], injectBodyNode),
                []
              )
            )
            const importNode = t.importDeclaration(
              [
                t.importSpecifier(t.identifier("css"), t.identifier("css")),
                t.importSpecifier(t.identifier("easyStore"), t.identifier("easyStore")),
                t.importSpecifier(t.identifier("geneEasyStyle"), t.identifier("geneEasyStyle")),
                t.importSpecifier(t.identifier("clearStore"), t.identifier("clearStore")),
                t.importSpecifier(t.identifier("inheritEasyStore"), t.identifier("inheritEasyStore")),
                t.importSpecifier(t.identifier("injectListStyle"), t.identifier("injectListStyle"))
              ],
              t.stringLiteral("@iandx/easy-css")
            )
            path.node.body = path.node.body.filter((node: t.ExpressionStatement | t.ImportDeclaration) => {
              if (!t.isImportDeclaration(node)) return true
              const allImports = node.specifiers
                .filter(n => t.isImportSpecifier(n) && t.isIdentifier(n.imported))
                .map((n: any) => n.imported.name)
              return !(allImports.includes("css") && node.source.value === "@iandx/easy-css")
            })
            path.node.body.unshift(injectNode)
            path.node.body.unshift(importNode)
          }
        }
      },
      ImportDeclaration(path: any) {
        const node = path.node as t.ImportDeclaration
        const allImports = node.specifiers
          .filter(n => t.isImportSpecifier(n) && t.isIdentifier(n.imported))
          .map((n: any) => n.imported.name)
        if (!allImports.includes("css")) return
        if (node.source.value !== "@iandx/easy-css") return
        this.easyCss = true
      },
      TaggedTemplateExpression(path: any) {
        if (!this.easyCss) return
        const node = path.node as t.TaggedTemplateExpression
        if (!t.isIdentifier(node.tag) || node.tag.name !== "css") return
        let parentPath = path.parentPath
        let parentNode = parentPath.node
        let params: t.Identifier[] | undefined
        if (t.isArrowFunctionExpression(parentNode)) {
          params = parentNode.params as any
          parentPath = parentPath.parentPath
          parentNode = parentPath.node
        }
        const getEasyName = (name: string) => {
          name = toHyphenatedCase(name)
          // ---- only pre-parse for non-function and static string
          if (!params && node.quasi.quasis.length === 1) {
            const cssString = node.quasi.quasis[0].value.raw
            const styleName = css.collect(cssString, name)
            renewEasyCss()
            return { parsed: true, node: t.stringLiteral(styleName) }
          }
          if (!params || params.length === 0) {
            return { parsed: false, node: t.stringLiteral(name) }
          }
          return {
            parsed: false,
            node: t.templateLiteral(
              [
                t.templateElement({ raw: `${name.endsWith("$") ? name.slice(0, -1) : name}-` }),
                ...params.slice(0, -1).map(_ => t.templateElement({ raw: "-" })),
                t.templateElement({ raw: name.endsWith("$") ? "$" : "" })
              ],
              params
            )
          }
        }
        if (t.isVariableDeclarator(parentNode)) {
          if (!t.isIdentifier(parentNode.id)) return
          const easy = getEasyName(parentNode.id.name)
          path.replaceWith(
            easy.parsed
              ? easy.node
              : t.callExpression(
                t.memberExpression(
                  t.identifier("css"),
                  t.identifier("collect")
                ),
                [node.quasi, easy.node]
              )
          )
          path.skip()
          return
        }
        if (t.isClassProperty(parentNode)) {
          if (!t.isIdentifier(parentNode.key)) return
          const easy = getEasyName(parentNode.key.name)
          path.replaceWith(
            easy.parsed
              ? easy.node
              : t.callExpression(
                t.memberExpression(
                  t.identifier("css"),
                  t.identifier("collect")
                ),
                [node.quasi, easy.node]
              )
          )
          path.skip()
          return
        }
        if (t.isObjectProperty(parentNode)) {
          if (t.isPrivateName(parentNode.key)) return
          const easy = getEasyName(
            t.isIdentifier(parentNode.key)
              ? parentNode.key.name
              : (parentNode.key as any).value
          )

          path.replaceWith(
            easy.parsed
              ? easy.node
              : t.callExpression(
                t.memberExpression(
                  t.identifier("css"),
                  t.identifier("collect")
                ),
                [
                  node.quasi,
                  parentNode.computed
                    ? parentNode.key
                    : easy.node
                ]
              )
          )
          path.skip()
          return
        }
        path.replaceWith(
          t.callExpression(
            t.memberExpression(
              t.identifier("css"),
              t.identifier("collect")
            ), [node.quasi]
          )
        )
        path.skip()
      },
      CallExpression(path: any) {
        if (!utilities) return
        const node = path.node
        if (safeNames.length === 0 && t.isMemberExpression(node.callee)) return
        if (safeNames.length !== 0 && !(
          t.isMemberExpression(node.callee) &&
          t.isIdentifier(node.callee.object) &&
          safeNames.includes(node.callee.object.name)
        )) return
        for (const argument of node.arguments) {
          if (!t.isStringLiteral(argument)) return
        }
        const utilityName = safeNames.length === 0 ? node.callee.name : node.callee.property.name
        const args = node.arguments.map((arg: t.StringLiteral) => arg.value)
        for (const { easyFuncMap, safeName } of utilities) {
          if (safeName && node.callee.object.name !== safeName) continue
          const utility = easyFuncMap[utilityName]
          if (!utility) continue
          const styleName = utility(...args)
          renewEasyCss()
          path.replaceWith(t.stringLiteral(styleName))
          path.skip()
          return
        }
      }
    }
  }
}
