import * as t from "@babel/types"
import { isAHtmlTag } from "./htmlTags"
import { minimatch } from "minimatch"

interface EasyCssOption {
  utilities?: Array<{
    easyFuncMap: Record<string, ((...args: any) => string)>
    safeName: string
  }>
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

export default function(api: any, options: EasyCssOption) {
  const {
    utilities,
    files: preFiles = "**/*.{js,jsx,ts,tsx}",
    excludeFiles: preExcludeFiles = "**/{dist,node_modules,lib}/*.{js,ts}"
  } = options
  const files = Array.isArray(preFiles) ? preFiles : [preFiles]
  const excludeFiles = Array.isArray(preExcludeFiles) ? preExcludeFiles : [preExcludeFiles]

  let safeNames: string[] = []

  const handle = function(path: any) {
    path.scope.traverse(path.node, {
      ClassMethod(bodyPath: any) {
        const node = bodyPath.node as t.ClassMethod
        if (!(t.isIdentifier(node.key) && (
          node.key.name === "Body" || (
            node.decorators &&
            t.isIdentifier(node.decorators[0].expression) &&
            node.decorators[0].expression.name === "SubView"
          )))) return
        bodyPath.scope.traverse(node, {
          ExpressionStatement(path: any) {
            path.scope.traverse(path.node, {
              Identifier(path: any) {
                const node = path.node as t.Identifier
                let key: string | undefined
                let safeName: string | undefined
                for (const { easyFuncMap, safeName: sn } of utilities!) {
                  if (easyFuncMap[node.name]) {
                    key = node.name
                    safeName = sn
                  }
                }
                if (!key || !safeName) return
                // ---- 确保不是div()的tag
                if (!t.isMemberExpression(path.parentPath.node)) return
                // ---- 去除闭包中的情况
                let tempPath = path.parentPath
                while (tempPath && tempPath !== bodyPath) {
                  // 遍历上去只能是 member: xx.margin / call: xx.margin() / block: {xx.margin()}
                  if (!(
                    t.isMemberExpression(tempPath.node) ||
                    t.isCallExpression(tempPath.node) ||
                    t.isBlockStatement(tempPath.node)
                  )) return
                  tempPath = tempPath.parentPath
                }
                // ---- 找到 div().a().b().c().margin()中的div，只可能是 member 和 call
                let tagNode = path.parentPath.node
                while (tagNode.object || tagNode.callee) {
                  if (t.isMemberExpression(tagNode)) tagNode = tagNode.object
                  else if (t.isCallExpression(tagNode)) tagNode = tagNode.callee
                  else break
                }
                // ---- 如果不是htmlTag，就不要
                const tagName = tagNode.name
                if (!(tagName === "htmlTag" || isAHtmlTag(tagName))) return
                // ---- 添加进import
                safeNames.push(safeName)
                safeNames = [...new Set(safeNames)]
                // ---- 正式开始replace
                // xxx.margin("20px") ->  xxx.className()
                path.replaceWith(t.identifier("className"))
                //  xxx.className() -> xxx.className(margin("20px"))
                let callPath = path.parentPath
                while (!t.isCallExpression(callPath.node)) {
                  callPath = callPath.parentPath
                }
                callPath.replaceWith(t.callExpression(
                  callPath.node.callee,
                  [t.callExpression(
                    safeName
                      ? t.memberExpression(t.identifier(safeName), t.identifier(key))
                      : t.identifier(key),
                    callPath.node.arguments
                  )]
                ))
                callPath.skip()
                path.skip()
              }
            })
          }
        })
      }
    })
  }

  return {
    visitor: {
      Program: {
        enter(path: any, state: any) {
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
          if (!this.enter) return
          if (!utilities) return
          safeNames = []
        },
        exit(path: any) {
          if (!this.enter) return
          if (!utilities) return
          if (safeNames.length === 0) return
          path.node.body.unshift(t.importDeclaration(
            safeNames.map(name => t.importSpecifier(t.identifier(name), t.identifier(name))),
            t.stringLiteral("@dlightjs/easy-css")
          ))
          safeNames = []
        }
      },
      ClassDeclaration(path: any) {
        if (!this.enter) return
        if (!utilities) return
        if (!(t.isIdentifier(path.node.superClass) && path.node.superClass.name === "View")) return
        handle(path)
      },
      ClassExpression(path: any) {
        if (!this.enter) return
        if (!utilities) return
        if (!(t.isIdentifier(path.node.superClass) && path.node.superClass.name === "View")) return
        handle(path)
      }
    }
  }
}
