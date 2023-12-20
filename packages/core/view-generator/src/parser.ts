import { type types as t, type traverse } from "@babel/core"
import { type ViewParticle, type TemplateParticle, type HTMLParticle, type CompParticle, type ForParticle } from "@dlightjs/reactivity-parser"
import { type ViewGeneratorConfig, type ViewGeneratorOption } from "./types"
import { isInternalAttribute } from "./attr"

const isDev = process.env.NODE_ENV === "development"

export class ViewGenerator {
  static readonly prefixMap = isDev
    ? { template: "$t", node: "$n" }
    : { template: "template", node: "node" }

  private readonly viewParticles: ViewParticle[]
  private readonly config: ViewGeneratorConfig
  private readonly options?: ViewGeneratorOption

  private readonly t: typeof t
  private readonly traverse: typeof traverse
  private readonly className: string
  private readonly importMap: Record<string, string>

  private readonly topLevelNodes: string[] = []

  /**
   * @brief Constructor
   * @param viewUnit
   * @param config
   * @param options
   */
  constructor(
    viewParticles: ViewParticle[],
    config: ViewGeneratorConfig,
    options?: ViewGeneratorOption
  ) {
    this.viewParticles = viewParticles
    this.config = config
    this.options = options
    this.t = config.babelApi.types
    this.traverse = config.babelApi.traverse
    this.className = config.className
    this.importMap = config.importMap
  }

  initStatements: t.Statement[] = []
  private addInitStatement(...statements: t.Statement[]) {
    this.initStatements.push(...statements)
  }

  classProperties: t.ClassProperty[] = []
  private addStaticClassProperty(key: string, value: t.Expression) {
    this.classProperties.push(
      this.t.classProperty(
        this.t.identifier(key),
        value,
        undefined,
        undefined,
        undefined,
        true
      )
    )
  }

  private updateFuncInitd = false
  private readonly updateStatements: Record<number, t.Statement[]> = {}
  private addUpdateStatements(dependencies: number[] | undefined, statement: t.Statement[]) {
    if (!dependencies || dependencies.length === 0) return
    const depNum = this.calcDependencyNum(dependencies)
    if (!this.updateStatements[depNum]) this.updateStatements[depNum] = []
    this.updateStatements[depNum].push(...statement)
  }

  private addUpdateStatementsWithoutDep(statement: t.Statement[]) {
    if (!this.updateStatements[0]) this.updateStatements[0] = []
    this.updateStatements[0].push(...statement)
  }

  /**
   * const $update = (changed) => {
   *  if (changed & ${depNum}) {
   *   ${statements}
   *  }
   * ${statements}
   * }
   */
  private generateUpdateFunction() {
    if (Object.keys(this.updateStatements).length === 0) return []
    this.updateFuncInitd = true
    return [
      this.t.variableDeclaration("const", [
        this.t.variableDeclarator(
          this.t.identifier("$update"),
          this.t.arrowFunctionExpression(
            [this.t.identifier("changed")],
            this.t.blockStatement([
              ...Object.entries(this.updateStatements)
                .filter(([depNum]) => depNum !== "0")
                .map(([depNum, statements]) => {
                  return (
                    this.t.ifStatement(
                      this.t.binaryExpression(
                        "&",
                        this.t.identifier("changed"),
                        this.t.numericLiteral(Number(depNum))
                      ),
                      this.t.blockStatement(statements)
                    )
                  )
                }),
              ...this.updateStatements[0] ?? []
            ])
          )
        )
      ])
    ]
  }

  /**
   * this._$update = $update
   * return [...${this.topLevelNodes}]
   */
  private generateReturnStatement() {
    const statements = []
    if (this.updateFuncInitd) {
      statements.push(
        this.t.expressionStatement(
          this.t.assignmentExpression(
            "=",
            this.t.memberExpression(
              this.t.thisExpression(),
              this.t.identifier("_$update")
            ),
            this.t.identifier("$update")
          )
        )
      )
    }
    return [
      ...statements,
      this.t.returnStatement(
        this.t.arrayExpression(this.topLevelNodes.map(name => this.t.identifier(name)))
      )
    ]
  }

  generateTillReturn(): [t.Statement[], t.ClassProperty[]] {
    this.viewParticles.forEach((viewParticle) => {
      this.topLevelNodes.push(this.generateNodeName(this.nodeIdx + 1))
      this.addInitStatement(...this.resolveParticle(viewParticle))
    })
    return [this.initStatements, this.classProperties]
  }

  generate(): [t.BlockStatement, t.ClassProperty[]] {
    const bodyStatements = this.generateTillReturn()[0]
    const updateBlock = this.generateUpdateFunction()
    const returnStatement = this.generateReturnStatement()

    const bodyBlock = this.t.blockStatement([...bodyStatements, ...updateBlock, ...returnStatement])
    return [bodyBlock, this.classProperties]
  }


  private resolveParticle(particle: ViewParticle): t.Statement[] {
    if (particle.type === "template") return this.resolveTemplate(particle)
    if (particle.type === "html") return this.resolveHTML(particle)
    if (particle.type === "comp") return this.resolveComp(particle)
    if (particle.type === "for") return this.resolveFor(particle)
    return []
  }

  // ---- @Template ----
  private resolveTemplate(templateParticle: TemplateParticle): t.Statement[] {
    const [statements, collect] = this.statementsCollector()
    const { template, mutableParticles, props } = templateParticle
    const dlNodeName = this.generateNodeName()
    // ---- Add template declaration to class
    const templateName = this.addTemplate(template)
    // ---- Declare template node in View body
    collect(this.declareTemplateNode(dlNodeName, templateName))

    // ---- Insert elements first
    const paths: number[][] = []
    props.forEach(({ path }) => { paths.push(path) })
    mutableParticles.forEach(({ path }) => { paths.push(path.slice(0, -1)) })
    const [insertElementStatements, pathNameMap] = this.insertElements(paths, dlNodeName)
    collect(insertElementStatements)

    // ---- Resolve props
    props.forEach(({ tag, path, key, value, dependencyIndexArr }) => {
      const name = pathNameMap[path.join(".")]
      // ---- init dynamic prop store
      if (dependencyIndexArr && dependencyIndexArr.length > 0) {
        collect(this.initStaticHTMLProp(name, tag, key, value))
        this.addUpdateStatements(dependencyIndexArr, [this.setDynamicHTMLProp(name, tag, key, value)])
      } else {
        collect(this.setStaticHTMLProp(name, tag, key, value))
      }
    })

    // ---- Resolve mutable particles
    mutableParticles.forEach((particle) => {
      const path = particle.path
      // ---- Find parent htmlElement
      const parentName = pathNameMap[path.slice(0, -1).join(".")]

      collect(this.resolveParticle(particle))
      collect(this.insertNode(parentName, this.generateNodeName(this.nodeIdx), path[path.length - 1]))
    })

    return statements
  }

  /**
   * static ${templateName} = ${createTemplate}(${templateString})
   */
  private addTemplate(template: string) {
    const templateName = this.generateTemplateName()
    this.addStaticClassProperty(templateName, this.t.callExpression(
      this.t.identifier(this.importMap.createTemplate), [this.t.stringLiteral(template)]
    ))

    return templateName
  }

  /**
   * const ${dlNodeName} = ${this.className}.${templateName}()
   */
  private declareTemplateNode(dlNodeName: string, templateName: string) {
    return (
      this.t.variableDeclaration("const", [
        this.t.variableDeclarator(
          this.t.identifier(dlNodeName),
          this.t.callExpression(
            this.t.memberExpression(
              this.t.identifier(this.className),
              this.t.identifier(templateName)
            ),
            []
          )
        )
      ])
    )
  }

  /**
   * const ${dlNodeName} = ${getChildElementByPath}(${dlNodeName}, ...${path})
   */
  private insertElement(dlNodeName: string, path: number[]) {
    const newNodeName = this.generateNodeName()
    const addFirstChild = (object: t.Expression) => (
      // ---- ${object}.firstChild
      this.t.memberExpression(
        object,
        this.t.identifier("firstChild")
      )
    )
    const addSecondChild = (object: t.Expression) => (
      // ---- ${object}.firstChild.nextSibling
      this.t.memberExpression(
        addFirstChild(object),
        this.t.identifier("nextSibling")
      )
    )
    const addThirdChild = (object: t.Expression) => (
      // ---- ${object}.firstChild.nextSibling.nextSibling
      this.t.memberExpression(
        addSecondChild(object),
        this.t.identifier("nextSibling")
      )
    )
    const addOtherChild = (object: t.Expression, num: number) => (
      // ---- ${object}.childNodes[${num}]
      this.t.memberExpression(
        this.t.memberExpression(
          object,
          this.t.identifier("childNodes")
        ),
        this.t.numericLiteral(num),
        true
      )
    )
    return (
      this.t.variableDeclaration("const", [
        this.t.variableDeclarator(
          this.t.identifier(newNodeName),
          path.reduce((acc: t.Expression, cur: number) => {
            if (cur === 0) return addFirstChild(acc)
            if (cur === 1) return addSecondChild(acc)
            if (cur === 2) return addThirdChild(acc)
            return addOtherChild(acc, cur)
          }, this.t.identifier(dlNodeName))
        )
      ])
    )
  }

  private insertElements(paths: number[][], dlNodeName: string): [t.Statement[], Record<string, string>] {
    const [statements, collect] = this.statementsCollector()
    const nameMap: Record<string, number[]> = { [dlNodeName]: [] }

    const commonPrefixPaths = this.pathWithCommonPrefix(paths)
    commonPrefixPaths.forEach((path) => {
      let [name, pat] = this.findBestNodeAndPath(nameMap, path, dlNodeName)
      if (pat.length !== 0) {
        collect(this.insertElement(name, pat))
        name = this.generateNodeName(this.nodeIdx)
        nameMap[name] = path
      }
    })
    const pathNameMap = Object.fromEntries(
      Object.entries(nameMap)
        .map(([name, path]) => [path.join("."), name])
    )

    return [statements, pathNameMap]
  }


  /**
   * 1. Event listener
   *  - ${dlNodeName}.addEventListener(${key}, ${value})
   * 2. Style
   *  - ${setStyle}.(${dlNodeName}, ${value})
   * 2. HTML internal attribute -> DOM property
   *  - ${dlNodeName}.${key} = ${value}
   * 3. HTML custom attribute
   *  - ${dlNodeName}.setAttribute(${key}, ${value})
   */
  private setStaticHTMLProp(dlNodeName: string, tag: string, attrName: string, value: t.Expression) {
    if (attrName.startsWith("on")) {
      const eventName = attrName.slice(2).toLowerCase()
      return (
        this.t.expressionStatement(
          this.t.callExpression(
            this.t.memberExpression(
              this.t.identifier(dlNodeName),
              this.t.identifier("addEventListener")
            ),
            [this.t.stringLiteral(eventName), value]
          )
        )
      )
    }
    if (attrName === "style") {
      return (
        this.t.expressionStatement(
          this.t.callExpression(
            this.t.identifier(this.importMap.setStyle),
            [this.t.identifier(dlNodeName), value]
          )
        )
      )
    }
    if (isInternalAttribute(tag, attrName)) {
      if (attrName === "class") attrName = "className"
      else if (attrName === "for") attrName = "htmlFor"
      return (
        this.t.expressionStatement(
          this.t.assignmentExpression(
            "=",
            this.t.memberExpression(
              this.t.identifier(dlNodeName),
              this.t.identifier(attrName)
            ),
            value
          )
        )
      )
    }
    return (
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(dlNodeName),
            this.t.identifier("setAttribute")
          ),
          [this.t.stringLiteral(attrName), value]
        )
      )
    )
  }


  /**
   * 1. Event listener
   *  - ${setMemorizedEvent}(${dlNodeName}, ${key}, ${value})
   * 2. Style
   *  - ${setStyle}(${dlNodeName}, ${value})
   * 2. HTML internal attribute -> DOM property
   *  - ${dlNodeName}.${key} = ${value}
   * 3. HTML custom attribute
   *  - ${dlNodeName}.setAttribute(${key}, ${value})
   */
  private initStaticHTMLProp(dlNodeName: string, tag: string, attrName: string, value: t.Expression) {
    if (attrName.startsWith("on")) {
      const eventName = attrName.slice(2).toLowerCase()
      return (
        this.t.expressionStatement(
          this.t.callExpression(
            this.t.identifier(this.importMap.setMemorizedEvent),
            [this.t.identifier(dlNodeName), this.t.stringLiteral(eventName), value]
          )
        )
      )
    }
    if (attrName === "style") {
      return (
        this.t.expressionStatement(
          this.t.callExpression(
            this.t.identifier(this.importMap.setStyle),
            [this.t.identifier(dlNodeName), value]
          )
        )
      )
    }
    if (isInternalAttribute(tag, attrName)) {
      if (attrName === "class") attrName = "className"
      else if (attrName === "for") attrName = "htmlFor"
      return (
        this.t.expressionStatement(
          this.t.assignmentExpression(
            "=",
            this.t.memberExpression(
              this.t.identifier(dlNodeName),
              this.t.identifier(attrName)
            ),
            value
          )
        )
      )
    }
    return (
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(dlNodeName),
            this.t.identifier("setAttribute")
          ),
          [this.t.stringLiteral(attrName), value]
        )
      )
    )
  }

  /**
   * 1. Event listener
   *  - ${setMemorizedEvent}(${dlNodeName}, ${key}, ${value})
   * 2. Style
   *  - ${setStyle}(${dlNodeName}, ${value})
   * 3. HTML internal attribute -> DOM property
   *  - ${setMemorizedProp}(${dlNodeName}, ${key}, ${value})
   * 4. HTML custom attribute
   *  - ${setMemorizedAttr}(${dlNodeName}, ${key}, ${value})
   */
  private setDynamicHTMLProp(dlNodeName: string, tag: string, attrName: string, value: t.Expression) {
    if (attrName.startsWith("on")) {
      const eventName = attrName.slice(2).toLowerCase()
      return (
        this.t.expressionStatement(
          this.t.callExpression(
            this.t.identifier(this.importMap.setMemorizedEvent),
            [this.t.identifier(dlNodeName), this.t.stringLiteral(eventName), value]
          )
        )
      )
    }
    if (attrName === "style") {
      return (
        this.t.expressionStatement(
          this.t.callExpression(
            this.t.identifier(this.importMap.setStyle),
            [this.t.identifier(dlNodeName), value]
          )
        )
      )
    }
    if (isInternalAttribute(tag, attrName)) {
      if (attrName === "class") attrName = "className"
      else if (attrName === "for") attrName = "htmlFor"
      return (
        this.t.expressionStatement(
          this.t.callExpression(
            this.t.identifier(this.importMap.setMemorizedProp),
            [this.t.identifier(dlNodeName), this.t.stringLiteral(attrName), value]
          )
        )
      )
    }
    return (
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.identifier(this.importMap.setMemorizedAttr),
          [this.t.identifier(dlNodeName), this.t.stringLiteral(attrName), value]
        )
      )
    )
  }

  /**
   * insertNode(${dlNodeName}, ${childNodeName}, ${position})
   */
  private insertNode(dlNodeName: string, childNodeName: string, position: number) {
    return (
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.identifier(this.importMap.insertNode),
          [
            this.t.identifier(dlNodeName),
            this.t.identifier(childNodeName),
            this.t.numericLiteral(position)
          ]
        )
      )
    )
  }

  // ---- @HTML ----
  private resolveHTML(htmlParticle: HTMLParticle): t.Statement[] {
    const [statements, collect] = this.statementsCollector()
    const { tag, props, children } = htmlParticle

    const dlNodeName = this.generateNodeName()
    collect(this.declareHTMLNode(dlNodeName, tag.value))

    const tagName = this.t.isStringLiteral(tag.value)
      ? tag.value.value
      : "ANY"
    // ---- Resolve props
    if (props) {
      Object.entries(props).forEach(([key, { value, dependencyIndexArr }]) => {
        if (dependencyIndexArr && dependencyIndexArr.length > 0) {
          const setDynamicHTMLPropStatement = this.setDynamicHTMLProp(dlNodeName, tagName, key, value)
          collect(setDynamicHTMLPropStatement)
          this.addUpdateStatements(dependencyIndexArr, [setDynamicHTMLPropStatement])
        } else {
          collect(this.setStaticHTMLProp(dlNodeName, tagName, key, value))
        }
      })
    }

    // ---- Resolve children
    if (children) {
      const childNames: string[] = []
      children.forEach((child, idx) => {
        const childName = this.generateNodeName(this.nodeIdx + 1)
        childNames.push(childName)
        collect(this.resolveParticle(child))
        if (child.type === "html") collect(this.appendChild(dlNodeName, childName))
        else collect(this.insertNode(dlNodeName, childName, idx))
      })
      collect(this.setHTMLNodes(dlNodeName, childNames))
    }

    return statements
  }

  /**
   * const ${dlNodeName} = createElement(${tag})
   */
  private declareHTMLNode(dlNodeName: string, tag: t.Expression) {
    return (
      this.t.variableDeclaration("const", [
        this.t.variableDeclarator(
          this.t.identifier(dlNodeName),
          this.t.callExpression(
            this.t.identifier(this.importMap.createElement),
            [tag]
          )
        )
      ])
    )
  }

  /**
   * ${dlNodeName}.appendChild(${childNodeName})
   */
  private appendChild(dlNodeName: string, childNodeName: string) {
    return (
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(dlNodeName),
            this.t.identifier("appendChild")
          ),
          [this.t.identifier(childNodeName)]
        )
      )
    )
  }

  /**
   * ${dlNodeName}._$nodes = [...${childNames}]
   */
  private setHTMLNodes(dlNodeName: string, childNames: string[]) {
    return (
      this.t.expressionStatement(
        this.t.assignmentExpression(
          "=",
          this.t.memberExpression(
            this.t.identifier(dlNodeName),
            this.t.identifier("_$nodes")
          ),
          this.t.arrayExpression(childNames.map(name => this.t.identifier(name)))
        )
      )
    )
  }

  // ---- @Comp ----
  private resolveComp(compParticle: CompParticle): t.Statement[] {
    const [statements, collect] = this.statementsCollector()
    const dlNodeName = this.generateNodeName()

    collect(this.declareCompNode(dlNodeName, compParticle.tag.value))

    const { content, props, children } = compParticle
    // ---- Resolve content
    if (content) {
      const { value, dependencyIndexArr } = content
      const setDynamicDLPropStatement = this.setDLContent(dlNodeName, value)
      collect(setDynamicDLPropStatement)

      if (dependencyIndexArr && dependencyIndexArr.length > 0) {
        this.addUpdateStatements(dependencyIndexArr, [setDynamicDLPropStatement])
      }
    }

    // ---- Resolve props
    if (props) {
      Object.entries(props).forEach(([key, { value, dependencyIndexArr }]) => {
        if (dependencyIndexArr && dependencyIndexArr.length > 0) {
          const setDynamicDLPropStatement = this.setDLProp(dlNodeName, key, value)
          collect(setDynamicDLPropStatement)
          this.addUpdateStatements(dependencyIndexArr, [setDynamicDLPropStatement])
        } else {
          collect(this.setDLProp(dlNodeName, key, value))
        }
      })
    }

    return statements
  }

  /**
   * const ${dlNodeName} = new ${tag}()
   */
  private declareCompNode(dlNodeName: string, tag: t.Expression) {
    return (
      this.t.variableDeclaration("const", [
        this.t.variableDeclarator(
          this.t.identifier(dlNodeName),
          this.t.newExpression(
            tag,
            []
          )
        )
      ])
    )
  }

  /**
   * setDLContent(${dlNodeName}, ${value})
   */
  private setDLContent(dlNodeName: string, value: t.Expression) {
    return (
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.identifier(this.importMap.setDLContent),
          [this.t.identifier(dlNodeName), value]
        )
      )
    )
  }

  /**
   * setDLProp(${dlNodeName}, ${key}, ${value})
   */
  private setDLProp(dlNodeName: string, key: string, value: t.Expression) {
    return (
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.identifier(this.importMap.setDLProp),
          [this.t.identifier(dlNodeName), this.t.stringLiteral(key), value]
        )
      )
    )
  }

  // ---- @For ----
  private resolveFor(forParticle: ForParticle): t.Statement[] {
    const [statements, collect] = this.statementsCollector()
    const { item, array, key, children } = forParticle
    const dlNodeName = this.generateNodeName()

    // ---- Declare for node
    collect(this.declareForNode(dlNodeName, array.value, item, children, this.calcDependencyNum(array.dependencyIndexArr), key))

    // ---- Update statements
    this.addUpdateStatements(array.dependencyIndexArr, [this.updateForNode(dlNodeName, array.value, item, key)])

    this.addUpdateStatementsWithoutDep([this.updateForNodeItem(dlNodeName)])

    return statements
  }

  /**
   * ${array}.map(${item} => ${key})
   *  or
   * ${array}
   */
  private getForKeyStatement(dlNodeName: string, array: t.Expression, item: t.LVal, key?: t.Expression) {
    if (key) {
      return (
        this.t.callExpression(
          this.t.memberExpression(
            array,
            this.t.identifier("map")
          ),
          [this.t.arrowFunctionExpression([item as any], key)]
        )
      )
    }
    return (
      array
    )
  }

  /**
   * const ${dlNodeName} = new ForNode(${array}, ${item} => {
   *   ${children}
   *   const $update = (changed, ${item}) => {
   *      if (changed & ${depNum}) {
   *        ${statements}
   *      }
   *      ${statements}
   *   }
   *   ${topLevelNodes[0])._$updateFunc = $update
   *   return [...${topLevelNodes}]
   * }, ${depNum}, ${array}.map(${item} => ${key}))
   */
  private declareForNode(dlNodeName: string, array: t.Expression, item: t.LVal, children: ViewParticle[], depNum: number, key?: t.Expression) {
    // ---- NodeFunc
    const newGenerator = this.newGenerator(children)
    newGenerator.templateIdx = this.templateIdx

    const [childStatements, childProperties] = newGenerator.generateTillReturn()
    this.classProperties.push(...childProperties)

    const topLevelNodes = newGenerator.topLevelNodes

    // ---- Update func
    const updateStatements = newGenerator.updateStatements
    if (Object.keys(updateStatements).length > 0) {
      childStatements.push(
        this.t.expressionStatement(
          this.t.assignmentExpression(
            "=",
            this.t.memberExpression(
              this.t.identifier(topLevelNodes[0]),
              this.t.identifier("_$updateFunc")
            ),
            this.t.arrowFunctionExpression(
              [this.t.identifier("changed"), item as any],
              this.t.blockStatement([
                ...Object.entries(updateStatements)
                  .filter(([depNum]) => depNum !== "0")
                  .map(([depNum, statements]) => {
                    return (
                      this.t.ifStatement(
                        this.t.binaryExpression(
                          "&",
                          this.t.identifier("changed"),
                          this.t.numericLiteral(Number(depNum))
                        ),
                        this.t.blockStatement(statements)
                      )
                    )
                  }),
                ...updateStatements[0] ?? []
              ])
            )
          )
        )
      )
    }

    // ---- Return statement
    childStatements.push(
      this.t.returnStatement(
        this.t.arrayExpression(topLevelNodes.map(name => this.t.identifier(name)))
      )
    )

    return (
      this.t.variableDeclaration("const", [
        this.t.variableDeclarator(
          this.t.identifier(dlNodeName),
          this.t.newExpression(
            this.t.identifier(this.importMap.ForNode), [
              array,
              this.t.arrowFunctionExpression(
                [item as any],
                this.t.blockStatement(childStatements)
              ),
              this.t.numericLiteral(depNum),
              this.getForKeyStatement(dlNodeName, array, item, key)
            ]
          )
        )
      ])
    )
  }

  /**
   * ${dlNodeName}.updateArray(${array}, ${array}.map(${item} => ${key}))
   */
  private updateForNode(dlNodeName: string, array: t.Expression, item: t.LVal, key?: t.Expression) {
    return (
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(dlNodeName),
            this.t.identifier("updateArray")
          ),
          [
            array,
            this.getForKeyStatement(dlNodeName, array, item, key)
          ]
        )
      )
    )
  }

  /**
   * ${dlNodeName}.update(changed)
   */
  private updateForNodeItem(dlNodeName: string) {
    return (
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(dlNodeName),
            this.t.identifier("update")
          ),
          [this.t.identifier("changed")]
        )
      )
    )
  }

  private newGenerator(viewParticles: ViewParticle[]): ViewGenerator {
    return new ViewGenerator(viewParticles, this.config, this.options)
  }

  // ---- Utils ----
  /**
   *
   * @param dependencies
   * @returns
   */
  private calcDependencyNum(dependencies: number[] | undefined): number {
    if (!dependencies || dependencies.length === 0) return 0
    return dependencies.reduce((acc, dep) => acc + 1 << dep, 0)
  }

  private findBestNodeAndPath(nameMap: Record<string, number[]>, path: number[], defaultName: string): [string, number[]] {
    let bestMatchCount = 0
    let bestMatchName: string | undefined
    Object.entries(nameMap).forEach(([name, pat]) => {
      let matchCount = 0
      for (let i = 0; i < pat.length; i++) {
        if (pat[i] === path[i]) matchCount++
      }
      if (matchCount !== pat.length) return
      if (matchCount > bestMatchCount) {
        bestMatchName = name
        bestMatchCount = matchCount
      }
    })
    if (!bestMatchName) return [defaultName, path]
    return [bestMatchName, path.slice(bestMatchCount)]
  }

  private pathWithCommonPrefix(paths: number[][]) {
    const allPaths = [...paths]
    paths.forEach(path0 => {
      paths.forEach(path1 => {
        for (let i = 0; i < path0.length; i++) {
          if (path0[i] !== path1[i] && i !== 0) {
            allPaths.push(path0.slice(0, i))
            break
          }
        }
      })
    })

    return allPaths.sort((a, b) => {
      if (a.length !== b.length) return a.length - b.length
      return a[0] - b[0]
    })
  }

  private statementsCollector(): [t.Statement[], (...statements: t.Statement[] | t.Statement[][]) => void] {
    const statements: t.Statement[] = []
    const collect = (...newStatements: t.Statement[] | t.Statement[][]) => {
      newStatements.forEach(s => {
        if (Array.isArray(s)) {
          statements.push(...s)
        } else {
          statements.push(s)
        }
      })
    }

    return [statements, collect]
  }

  // ---- Name ----
  nodeIdx = -1
  private generateNodeName(idx?: number): string {
    return `${ViewGenerator.prefixMap.node}${idx ?? ++this.nodeIdx}`
  }

  templateIdx = -1
  private generateTemplateName(): string {
    return `${ViewGenerator.prefixMap.template}${++this.templateIdx}`
  }
}
