import { type types as t } from "@babel/core"
import {
  type HTMLParticle,
  type TemplateParticle,
} from "@dlightjs/reactivity-parser"
import HTMLPropGenerator from "../HelperGenerators/HTMLPropGenerator"

export default class TemplateGenerator extends HTMLPropGenerator {
  run() {
    const { template, mutableParticles, props } = this
      .viewParticle as TemplateParticle

    const dlNodeName = this.generateNodeName()
    // ---- Add template declaration to class
    const templateName = this.addTemplate(template)
    // ---- Declare template node in View body
    this.addInitStatement(this.declareTemplateNode(dlNodeName, templateName))

    // ---- Insert elements first
    const paths: number[][] = []
    props.forEach(({ path }) => {
      paths.push(path)
    })
    mutableParticles.forEach(({ path }) => {
      paths.push(path.slice(0, -1))
    })
    const [insertElementStatements, pathNameMap] = this.insertElements(
      paths,
      dlNodeName
    )
    this.addInitStatement(...insertElementStatements)

    // ---- Resolve props
    const didUpdateMap: Record<
      string,
      { deps: number[]; value?: t.Expression }
    > = {}
    props.forEach(
      ({ tag, path, key, value, dependencyIndexArr, dependenciesNode }) => {
        const name = pathNameMap[path.join(".")]
        if (!didUpdateMap[name])
          didUpdateMap[name] = {
            deps: [],
          }
        if (key === "didUpdate") {
          didUpdateMap[name].value = value
          return
        }

        didUpdateMap[name].deps.push(...dependencyIndexArr)

        this.addInitStatement(
          this.addHTMLProp(
            name,
            tag,
            key,
            value,
            dependencyIndexArr,
            dependenciesNode
          )
        )
      }
    )

    Object.entries(didUpdateMap).forEach(([name, { deps, value }]) => {
      if (!value) return
      console.log(name, deps)
      this.addUpdateStatements(deps, this.addOnUpdate(name, value))
    })

    // ---- Resolve mutable particles
    mutableParticles.forEach(particle => {
      const path = particle.path
      // ---- Find parent htmlElement
      const parentName = pathNameMap[path.slice(0, -1).join(".")]
      const [initStatements, childName] = this.generateChild(particle)
      this.addInitStatement(...initStatements)
      this.addInitStatement(
        this.insertNode(parentName, childName, path[path.length - 1])
      )
    })

    return dlNodeName
  }

  /**
   * @View
   * static ${templateName} = (() => {
   *   let _$node0, _$node1, ...
   *   ${template}
   *
   *  return _$node0
   * })()
   */
  private addTemplate(template: HTMLParticle): string {
    const templateName = this.generateTemplateName()
    const [statements, nodeName, , nodeIdx] = this.generateChild(
      template,
      false,
      true
    )
    this.addStaticClassProperty(
      templateName,
      this.t.callExpression(
        this.t.arrowFunctionExpression(
          [],
          this.t.blockStatement([
            ...this.declareNodes(nodeIdx),
            ...statements,
            this.t.returnStatement(this.t.identifier(nodeName)),
          ])
        ),
        []
      )
    )

    return templateName
  }

  /**
   * @View
   * ${dlNodeName} = ${this.className}.${templateName}.cloneNode(true)
   */
  private declareTemplateNode(
    dlNodeName: string,
    templateName: string
  ): t.Statement {
    return this.t.expressionStatement(
      this.t.assignmentExpression(
        "=",
        this.t.identifier(dlNodeName),
        this.t.callExpression(
          this.t.memberExpression(
            this.t.memberExpression(
              this.t.identifier(this.className),
              this.t.identifier(templateName)
            ),
            this.t.identifier("cloneNode")
          ),
          [this.t.booleanLiteral(true)]
        )
      )
    )
  }

  /**
   * @View
   * ${dlNodeName}.firstChild
   *  or
   * ${dlNodeName}.firstChild.nextSibling
   *  or
   * ...
   * ${dlNodeName}.childNodes[${num}]
   */
  private insertElement(
    dlNodeName: string,
    path: number[],
    offset: number
  ): t.Statement {
    const newNodeName = this.generateNodeName()
    if (path.length === 0) {
      return this.t.expressionStatement(
        this.t.assignmentExpression(
          "=",
          this.t.identifier(newNodeName),
          Array.from({ length: offset }).reduce(
            (acc: t.Expression) =>
              this.t.memberExpression(acc, this.t.identifier("nextSibling")),
            this.t.identifier(dlNodeName)
          )
        )
      )
    }
    const addFirstChild = (object: t.Expression) =>
      // ---- ${object}.firstChild
      this.t.memberExpression(object, this.t.identifier("firstChild"))
    const addSecondChild = (object: t.Expression) =>
      // ---- ${object}.firstChild.nextSibling
      this.t.memberExpression(
        addFirstChild(object),
        this.t.identifier("nextSibling")
      )
    const addThirdChild = (object: t.Expression) =>
      // ---- ${object}.firstChild.nextSibling.nextSibling
      this.t.memberExpression(
        addSecondChild(object),
        this.t.identifier("nextSibling")
      )
    const addOtherChild = (object: t.Expression, num: number) =>
      // ---- ${object}.childNodes[${num}]
      this.t.memberExpression(
        this.t.memberExpression(object, this.t.identifier("childNodes")),
        this.t.numericLiteral(num),
        true
      )
    const addNextSibling = (object: t.Expression) =>
      // ---- ${object}.nextSibling
      this.t.memberExpression(object, this.t.identifier("nextSibling"))
    return this.t.expressionStatement(
      this.t.assignmentExpression(
        "=",
        this.t.identifier(newNodeName),
        path.reduce((acc: t.Expression, cur: number, idx) => {
          if (idx === 0 && offset > 0) {
            for (let i = 0; i < offset; i++) acc = addNextSibling(acc)
          }
          if (cur === 0) return addFirstChild(acc)
          if (cur === 1) return addSecondChild(acc)
          if (cur === 2) return addThirdChild(acc)
          return addOtherChild(acc, cur)
        }, this.t.identifier(dlNodeName))
      )
    )
  }

  /**
   * @brief Insert elements to the template node from the paths
   * @param paths
   * @param dlNodeName
   * @returns
   */
  private insertElements(
    paths: number[][],
    dlNodeName: string
  ): [t.Statement[], Record<string, string>] {
    const [statements, collect] = HTMLPropGenerator.statementsCollector()
    const nameMap: Record<string, number[]> = { [dlNodeName]: [] }

    const commonPrefixPaths = TemplateGenerator.pathWithCommonPrefix(paths)

    commonPrefixPaths.forEach(path => {
      const res = TemplateGenerator.findBestNodeAndPath(
        nameMap,
        path,
        dlNodeName
      )
      const [, pat, offset] = res
      let name = res[0]

      if (pat.length !== 0 || offset !== 0) {
        collect(this.insertElement(name, pat, offset))
        name = this.generateNodeName(this.nodeIdx)
        nameMap[name] = path
      }
    })
    const pathNameMap = Object.fromEntries(
      Object.entries(nameMap).map(([name, path]) => [path.join("."), name])
    )

    return [statements, pathNameMap]
  }

  // ---- Path related
  /**
   * @brief Extract common prefix from paths
   *  e.g.
   *    [0, 1, 2, 3] + [0, 1, 2, 4] => [0, 1, 2], [0, 1, 2, 3], [0, 1, 2, 4]
   *  [0, 1, 2] is the common prefix
   * @param paths
   * @returns paths with common prefix
   */
  private static pathWithCommonPrefix(paths: number[][]): number[][] {
    const allPaths = [...paths]
    paths.forEach(path0 => {
      paths.forEach(path1 => {
        if (path0 === path1) return
        for (let i = 0; i < path0.length; i++) {
          if (path0[i] !== path1[i]) {
            if (i !== 0) {
              allPaths.push(path0.slice(0, i))
            }
            break
          }
        }
      })
    })

    // ---- Sort by length and then by first element, small to large
    const sortedPaths = allPaths.sort((a, b) => {
      if (a.length !== b.length) return a.length - b.length
      return a[0] - b[0]
    })

    // ---- Deduplicate
    const deduplicatedPaths = [
      ...new Set(sortedPaths.map(path => path.join("."))),
    ].map(path => path.split(".").filter(Boolean).map(Number))

    return deduplicatedPaths
  }

  /**
   * @brief Find the best node name and path for the given path by looking into the nameMap.
   *  If there's a full match, return the name and an empty path
   *  If there's a partly match, return the name and the remaining path
   *  If there's a nextSibling match, return the name and the remaining path with sibling offset
   * @param nameMap
   * @param path
   * @param defaultName
   * @returns [name, path, siblingOffset]
   */
  private static findBestNodeAndPath(
    nameMap: Record<string, number[]>,
    path: number[],
    defaultName: string
  ): [string, number[], number] {
    let bestMatchCount = 0
    let bestMatchName: string | undefined
    let bestHalfMatch: [string, number, number] | undefined
    Object.entries(nameMap).forEach(([name, pat]) => {
      let matchCount = 0
      const pathLength = pat.length
      for (let i = 0; i < pathLength; i++) {
        if (pat[i] === path[i]) matchCount++
      }
      if (matchCount === pathLength - 1) {
        const offset = path[pathLength - 1] - pat[pathLength - 1]
        if (offset > 0 && offset <= 3) {
          bestHalfMatch = [name, matchCount, offset]
        }
      }
      if (matchCount !== pat.length) return
      if (matchCount > bestMatchCount) {
        bestMatchName = name
        bestMatchCount = matchCount
      }
    })
    if (!bestMatchName) {
      if (bestHalfMatch) {
        return [
          bestHalfMatch[0],
          path.slice(bestHalfMatch[1] + 1),
          bestHalfMatch[2],
        ]
      }
      return [defaultName, path, 0]
    }
    return [bestMatchName, path.slice(bestMatchCount), 0]
  }
}
