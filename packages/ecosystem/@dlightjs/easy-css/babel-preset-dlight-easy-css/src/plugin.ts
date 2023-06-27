import * as t from "@babel/types"

interface EasyCssOption {
  utilities?: Array<{
    easyFuncMap: Record<string, ((...args: any) => string)>
    safeName: string
  }>
}

export default function(api: any, { utilities }: EasyCssOption) {
  let safeNames: string[] = []

  const handle = function(path: any) {
    path.scope.traverse(path.node, {
      ClassMethod(bodyPath: any) {
        const node = bodyPath.node as t.ClassMethod
        if (!(t.isIdentifier(node.key) && node.key.name === "Body")) return
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
                // 确保不是div()的tag
                if (!t.isMemberExpression(path.parentPath.node)) return
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
        enter() {
          if (!utilities) return
          safeNames = []
        },
        exit(path: any) {
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
        if (!utilities) return
        if (!(t.isIdentifier(path.node.superClass) && path.node.superClass.name === "View")) return
        handle(path)
      },
      ClassExpression(path: any) {
        if (!utilities) return
        if (!(t.isIdentifier(path.node.superClass) && path.node.superClass.name === "View")) return
        handle(path)
      }
    }
  }
}
