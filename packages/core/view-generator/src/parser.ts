import { type types as t, type traverse } from "@babel/core"
import { type ViewParticle, type TemplateParticle, type HTMLParticle, type CompParticle, type ForParticle, type IfParticle, type IfBranch, type EnvParticle, type DependencyProp } from "@dlightjs/reactivity-parser"
import { type ViewGeneratorConfig, type ViewGeneratorOption } from "./types"
import { isInternalAttribute } from "./attr"
import { DLError } from "./error"
import { R } from "vitest/dist/reporters-5f784f42"

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

  private readonly updateStatements: Record<number, t.Statement[]> = {}
  private addUpdateStatements(dependencies: number[] | undefined, statement: t.Statement[]) {
    if (!dependencies || dependencies.length === 0) return
    dependencies = [...new Set(dependencies)]
    const depNum = this.calcDependencyNum(dependencies)
    if (!this.updateStatements[depNum]) this.updateStatements[depNum] = []
    this.updateStatements[depNum].push(...statement)
  }

  private addUpdateStatementsWithoutDep(statement: t.Statement[]) {
    if (!this.updateStatements[0]) this.updateStatements[0] = []
    this.updateStatements[0].push(...statement)
  }

  private geneReturnStatement(topLevelNodes: string[]) {
    return (
      this.t.returnStatement(
        this.t.arrayExpression(topLevelNodes.map(name => this.t.identifier(name)))
      )
    )
  }

  private geneUpdateBody(updateStatements: Record<number, t.Statement[]>): t.BlockStatement {
    return (
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
  }

  /**
   * this._$update = $update
   * return [...${this.topLevelNodes}]
   */
  private generateReturnStatement() {
    const statements = []
    if (Object.keys(this.updateStatements).length > 0) {
      statements.push(
        this.t.expressionStatement(
          this.t.assignmentExpression(
            "=",
            this.t.memberExpression(
              this.t.thisExpression(),
              this.t.identifier("_$update")
            ),
            this.t.arrowFunctionExpression(
              [this.t.identifier("changed")],
              this.geneUpdateBody(this.updateStatements)
            )
          )
        )
      )
    }
    return [
      ...statements,
      this.geneReturnStatement(this.topLevelNodes)
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
    const returnStatement = this.generateReturnStatement()

    const bodyBlock = this.t.blockStatement([...bodyStatements, ...returnStatement])
    return [bodyBlock, this.classProperties]
  }

  private resolveParticle(particle: ViewParticle): t.Statement[] {
    if (particle.type === "template") return this.resolveTemplate(particle)
    if (particle.type === "html") return this.resolveHTML(particle)
    if (particle.type === "comp") return this.resolveComp(particle)
    if (particle.type === "for") return this.resolveFor(particle)
    if (particle.type === "if") return this.resolveIf(particle)
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
      collect(this.addHTMLProp(name, tag, key, value, dependencyIndexArr))
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

  private insertElement(dlNodeName: string, path: number[], offset: number) {
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
    const addNextSibling = (object: t.Expression) => (
      // ---- ${object}.nextSibling
      this.t.memberExpression(
        object,
        this.t.identifier("nextSibling")
      )
    )
    return (
      this.t.variableDeclaration("const", [
        this.t.variableDeclarator(
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
      ])
    )
  }

  private insertElements(paths: number[][], dlNodeName: string): [t.Statement[], Record<string, string>] {
    const [statements, collect] = this.statementsCollector()
    const nameMap: Record<string, number[]> = { [dlNodeName]: [] }

    const commonPrefixPaths = this.pathWithCommonPrefix(paths)
    commonPrefixPaths.forEach((path) => {
      let [name, pat, offset] = this.findBestNodeAndPath(nameMap, path, dlNodeName)
      if (pat.length !== 0) {
        collect(this.insertElement(name, pat, offset))
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

  private addHTMLProp(name: string, tag: string, key: string, value: t.Expression, dependencyIndexArr: number[] | undefined) {
    const [statements, collect] = this.statementsCollector()
    if (dependencyIndexArr && dependencyIndexArr.length > 0) {
      collect(this.initStaticHTMLProp(name, tag, key, value))
      this.addUpdateStatements(dependencyIndexArr, [this.setDynamicHTMLProp(name, tag, key, value)])
    } else {
      collect(this.setStaticHTMLProp(name, tag, key, value))
    }

    return statements
  }

  /**
   * setStyle(${dlNodeName}, ${value})
   */
  private setHTMLStyle(dlNodeName: string, value: t.Expression) {
    return (
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.identifier(this.importMap.setStyle),
          [this.t.identifier(dlNodeName), value]
        )
      )
    )
  }

  /**
   * setStyle(${dlNodeName}, ${value})
   */
  private setHTMLDataset(dlNodeName: string, value: t.Expression) {
    return (
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.identifier(this.importMap.setDataset),
          [this.t.identifier(dlNodeName), value]
        )
      )
    )
  }

  /**
   * ${dlNodeName}.${key} = ${value}
   */
  private setHTMLProp(dlNodeName: string, key: string, value: t.Expression) {
    return (
      this.t.expressionStatement(
        this.t.assignmentExpression(
          "=",
          this.t.memberExpression(
            this.t.identifier(dlNodeName),
            this.t.identifier(key)
          ),
          value
        )
      )
    )
  }

  /**
   * ${dlNodeName}.setAttribute(${key}, ${value})
   */
  private setHTMLAttr(dlNodeName: string, key: string, value: t.Expression) {
    return (
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(dlNodeName),
            this.t.identifier("setAttribute")
          ),
          [this.t.stringLiteral(key), value]
        )
      )
    )
  }

  /**
   * ${dlNodeName}.addEventListener(${key}, ${value})
   */
  private setHTMLEvent(dlNodeName: string, key: string, value: t.Expression) {
    return (
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(dlNodeName),
            this.t.identifier("addEventListener")
          ),
          [this.t.stringLiteral(key), value]
        )
      )
    )
  }

  /**
   * setMemorizedEvent(${dlNodeName}, ${key}, ${value})
   */
  private setMemorizedEvent(dlNodeName: string, key: string, value: t.Expression) {
    return (
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.identifier(this.importMap.setMemorizedEvent),
          [this.t.identifier(dlNodeName), this.t.stringLiteral(key), value]
        )
      )
    )
  }

  /**
   * setHTMLProp(${dlNodeName}, ${key}, ${value})
   */
  private setCachedProp(dlNodeName: string, key: string, value: t.Expression) {
    return (
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.identifier(this.importMap.setHTMLProp),
          [this.t.identifier(dlNodeName), this.t.stringLiteral(key), value]
        )
      )
    )
  }

  /**
   * setHTMLAttr(${dlNodeName}, ${key}, ${value})
   */
  private setCachedAttr(dlNodeName: string, key: string, value: t.Expression) {
    return (
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.identifier(this.importMap.setHTMLAttr),
          [this.t.identifier(dlNodeName), this.t.stringLiteral(key), value]
        )
      )
    )
  }

  /**
   * if (typeof ${value} === "function") {
   *  ${value}(${dlNodeName})
   * } else {
   *  ${value} = ${dlNodeName}
   * }
   */
  private assignHTMLElement(dlNodeName: string, value: t.MemberExpression) {
    return (
      this.t.ifStatement(
        this.t.binaryExpression(
          "===",
          this.t.unaryExpression(
            "typeof",
            value,
            true
          ),
          this.t.stringLiteral("function")
        ),
        this.t.expressionStatement(
          this.t.callExpression(
            value,
            [this.t.identifier(dlNodeName)]
          )
        ),
        this.t.expressionStatement(
          this.t.assignmentExpression(
            "=",
            value,
            this.t.identifier(dlNodeName)
          )
        )
      )
    )
  }

  /**
   * ${value}(changed, ${dlNodeName})
   */
  private assignHTMLFunctionElement(dlNodeName: string, value: t.Expression) {
    if (!this.t.isFunctionExpression(value) && !this.t.isArrowFunctionExpression(value)) {
      return DLError.throw1()
    }
    return (
      this.t.expressionStatement(
        this.t.callExpression(
          value,
          [
            this.t.identifier("changed"),
            this.t.identifier(dlNodeName)
          ]
        )
      )
    )
  }

  /**
   * ${setHTMLProps}(${dlNodeName}, ${value})
   */
  private setHTMLPropObject(dlNodeName: string, value: t.Expression) {
    return (
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.identifier(this.importMap.setHTMLProps),
          [this.t.identifier(dlNodeName), value]
        )
      )
    )
  }

  /**
   * ${setHTMLAttrs}(${dlNodeName}, ${value})
   */
  private setHTMLAttrObject(dlNodeName: string, value: t.Expression) {
    return (
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.identifier(this.importMap.setHTMLAttrs),
          [this.t.identifier(dlNodeName), value]
        )
      )
    )
  }

  /**
   * this._$forwardHTMLProp(${dlNodeName})
   */
  private forwardHTMLProp(dlNodeName: string) {
    return (
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.thisExpression(),
            this.t.identifier("_$forwardHTMLProp")
          ),
          [this.t.identifier(dlNodeName)]
        )
      )
    )
  }

  private readonly commonHTMLPropKeys = ["style", "dataset", "element", "prop", "attr", "forwardProp"]
  /**
   * For style/dataset/element/attr/prop
   */
  private addCommonHTMLProp(dlNodeName: string, attrName: string, value: t.Expression) {
    if (attrName === "style") return this.setHTMLStyle(dlNodeName, value)
    if (attrName === "dataset") return this.setHTMLDataset(dlNodeName, value)
    if (attrName === "element") {
      if (this.isOnlyMemberExpression(value)) return this.assignHTMLElement(dlNodeName, value as t.MemberExpression)
      return this.assignHTMLFunctionElement(dlNodeName, value)
    }
    if (attrName === "prop") return this.setHTMLPropObject(dlNodeName, value)
    if (attrName === "attr") return this.setHTMLAttrObject(dlNodeName, value)
    if (attrName === "forwardProp") return this.forwardHTMLProp(dlNodeName)
    return DLError.throw2()
  }

  /**
   * 1. Event listener
   *  - ${dlNodeName}.addEventListener(${key}, ${value})
   * 2. HTML internal attribute -> DOM property
   *  - ${dlNodeName}.${key} = ${value}
   * 3. HTML custom attribute
   *  - ${dlNodeName}.setAttribute(${key}, ${value})
   */
  private setStaticHTMLProp(dlNodeName: string, tag: string, attrName: string, value: t.Expression) {
    if (this.commonHTMLPropKeys.includes(attrName)) return this.addCommonHTMLProp(dlNodeName, attrName, value)
    if (attrName.startsWith("on")) {
      const eventName = attrName.slice(2).toLowerCase()
      return this.setHTMLEvent(dlNodeName, eventName, value)
    }
    if (isInternalAttribute(tag, attrName)) {
      if (attrName === "class") attrName = "className"
      else if (attrName === "for") attrName = "htmlFor"
      return this.setHTMLProp(dlNodeName, attrName, value)
    }
    return this.setHTMLAttr(dlNodeName, attrName, value)
  }

  /**
   * 1. Event listener
   *  - ${setMemorizedEvent}(${dlNodeName}, ${key}, ${value})
   * 2. HTML internal attribute -> DOM property
   *  - ${dlNodeName}.${key} = ${value}
   * 3. HTML custom attribute
   *  - ${dlNodeName}.setAttribute(${key}, ${value})
   */
  private initStaticHTMLProp(dlNodeName: string, tag: string, attrName: string, value: t.Expression) {
    if (this.commonHTMLPropKeys.includes(attrName)) return this.addCommonHTMLProp(dlNodeName, attrName, value)
    if (attrName.startsWith("on")) {
      const eventName = attrName.slice(2).toLowerCase()
      return this.setMemorizedEvent(dlNodeName, eventName, value)
    }
    if (isInternalAttribute(tag, attrName)) {
      if (attrName === "class") attrName = "className"
      else if (attrName === "for") attrName = "htmlFor"
      return this.setHTMLProp(dlNodeName, attrName, value)
    }
    return this.setHTMLAttr(dlNodeName, attrName, value)
  }

  /**
   * 1. Event listener
   *  - ${setMemorizedEvent}(${dlNodeName}, ${key}, ${value})
   * 2. HTML internal attribute -> DOM property
   *  - ${setHTMLProp}(${dlNodeName}, ${key}, ${value})
   * 3. HTML custom attribute
   *  - ${setHTMLAttr}(${dlNodeName}, ${key}, ${value})
   */
  private setDynamicHTMLProp(dlNodeName: string, tag: string, attrName: string, value: t.Expression) {
    if (this.commonHTMLPropKeys.includes(attrName)) return this.addCommonHTMLProp(dlNodeName, attrName, value)
    if (attrName.startsWith("on")) {
      const eventName = attrName.slice(2).toLowerCase()
      return this.setMemorizedEvent(dlNodeName, eventName, value)
    }
    if (isInternalAttribute(tag, attrName)) {
      if (attrName === "class") attrName = "className"
      else if (attrName === "for") attrName = "htmlFor"
      return this.setCachedProp(dlNodeName, attrName, value)
    }
    return this.setCachedAttr(dlNodeName, attrName, value)
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
    collect(this.declareHTMLNode(dlNodeName, tag))

    const tagName = this.t.isStringLiteral(tag)
      ? tag.value
      : "ANY"
    // ---- Resolve props
    if (props) {
      Object.entries(props).forEach(([key, { value, dependencyIndexArr }]) => {
        collect(this.addHTMLProp(dlNodeName, tagName, key, value, dependencyIndexArr))
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

    collect(this.declareCompNode(dlNodeName, compParticle))

    const { content, props, children } = compParticle
    // ---- Resolve content
    if (content) {
      const { value, dependencyIndexArr } = content
      if (dependencyIndexArr && dependencyIndexArr.length > 0) {
        this.addUpdateStatements(dependencyIndexArr, [this.setCompContent(dlNodeName, value)])
      }
    }

    // ---- Resolve props
    if (props) {
      Object.entries(props).forEach(([key, { value, dependencyIndexArr }]) => {
        if (dependencyIndexArr && dependencyIndexArr.length > 0) {
          this.addUpdateStatements(dependencyIndexArr, [this.setCompProp(dlNodeName, key, value)])
        }
      })
    }

    return statements
  }

  private generateCompProps(props?: Record<string, DependencyProp>) {
    if (!props || Object.keys(props).length === 0) return this.t.nullLiteral()
    return (
      this.t.objectExpression(
        Object.entries(props).map(([key, { value }]) => (
          this.t.objectProperty(
            this.t.identifier(key),
            value
          )
        ))
      )
    )
  }

  private generateCompContent(content?: DependencyProp) {
    if (!content) return this.t.nullLiteral()
    return content.value
  }

  /**
   * const ${dlNodeName} = new ${tag}(props, content, children)
   */
  private declareCompNode(dlNodeName: string, compParticle: CompParticle) {
    const { tag, content, props, children } = compParticle

    return (
      this.t.variableDeclaration("const", [
        this.t.variableDeclarator(
          this.t.identifier(dlNodeName),
          this.t.newExpression(
            tag, [
              this.generateCompProps(props),
              this.generateCompContent(content),
            ])
        )
      ])
    )
  }

  /**
   * ${dlNodeName}._$setContent(${value})
   */
  private setCompContent(dlNodeName: string, value: t.Expression) {
    return (
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(dlNodeName),
            this.t.identifier("_$setContent")
          ),
          [value]
        )
      )
    )
  }

  /**
   * ${dlNodeName}._$setProp(${key}, ${value})
   */
  private setCompProp(dlNodeName: string, key: string, value: t.Expression) {
    return (
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(dlNodeName),
            this.t.identifier("_$setProp")
          ),
          [this.t.stringLiteral(key), value]
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

  // ---- @If ----
  private resolveIf(ifParticle: IfParticle): t.Statement[] {
    const [statements, collect] = this.statementsCollector()

    // ---- declareIfNode
    const dlNodeName = this.generateNodeName()
    collect(this.declareIfNode(dlNodeName, ifParticle.branches))

    const deps = ifParticle.branches.flatMap(({ condition }) => condition.dependencyIndexArr ?? [])
    this.addUpdateStatements(deps, [this.updateIfNodeCond(dlNodeName)])
    this.addUpdateStatementsWithoutDep([this.updateIfNode(dlNodeName)])

    return statements
  }

  private geneUpdateFunc(firstNode: string, updateStatements: Record<number, t.Statement[]>) {
    return (
      this.t.expressionStatement(
        this.t.assignmentExpression(
          "=",
          this.t.memberExpression(
            this.t.identifier(firstNode),
            this.t.identifier("_$updateFunc")
          ),
          this.t.arrowFunctionExpression(
            [this.t.identifier("changed")],
            this.geneUpdateBody(updateStatements)
          )
        )
      )
    )
  }

  /**
   * ${firstNode}._$cond = ${idx}
   */
  private geneCondIdx(firstNode: string, idx: number) {
    return (
      this.t.expressionStatement(
        this.t.assignmentExpression(
          "=",
          this.t.memberExpression(
            this.t.identifier(firstNode),
            this.t.identifier("cond")
          ),
          this.t.numericLiteral(idx)
        )
      )
    )
  }

  private geneCondCheck(idx: number) {
    return (
      this.t.ifStatement(
        this.t.binaryExpression(
          "===",
          this.t.memberExpression(
            this.t.identifier("$thisIf"),
            this.t.identifier("cond")
          ),
          this.t.numericLiteral(idx)
        ),
        this.t.returnStatement()
      )
    )
  }

  geneIfStatement(test: t.Expression, body: t.Statement[], alternate: t.Statement) {
    return this.t.ifStatement(test, this.t.blockStatement(body), alternate)
  }

  /**
   * const ${dlNodeName} = new IfNode(($thisIf) => {
   *   if (cond1) {
   *    if ($thisIf.cond === 0) return
   *    ${children}
   *    thisIf.cond = 0
   *    node0.update = () => {}
   *    return [nodes]
   *   } else if (cond2) {
   *    if ($thisIf.cond === 1) return
   *    ${children}
   *    thisIf.cond = 1
   *    return [nodes]
   *   }
   * })
   */
  private declareIfNode(dlNodeName: string, branches: IfBranch[]) {
    const ifStatement = branches.toReversed().reduce((acc, { condition, children }, idx) => {
      // ---- Generate children
      const newGenerator = this.newGenerator(children)
      newGenerator.templateIdx = this.templateIdx
      const [childStatements, childProperties] = newGenerator.generateTillReturn()
      this.classProperties.push(...childProperties)
      const topLevelNodes = newGenerator.topLevelNodes

      // ---- Check cond statement
      childStatements.unshift(this.geneCondCheck(branches.length - idx - 1))

      // ---- Update func
      const updateStatements = newGenerator.updateStatements
      if (Object.keys(updateStatements).length > 0) {
        childStatements.push(this.geneUpdateFunc(topLevelNodes[0], updateStatements))
      }

      // ---- Cond idx (reverse order)
      childStatements.push(this.geneCondIdx("$thisIf", branches.length - idx - 1))

      // ---- Return statement
      childStatements.push(this.geneReturnStatement(topLevelNodes))

      if (idx === 0 && this.t.isBooleanLiteral(condition.value, { value: true })) {
        // ---- else statement
        return this.t.blockStatement(childStatements)
      }

      return this.geneIfStatement(condition.value, childStatements, acc)
    }, undefined)

    return (
      this.t.variableDeclaration("const", [
        this.t.variableDeclarator(
          this.t.identifier(dlNodeName),
          this.t.newExpression(
            this.t.identifier(this.importMap.IfNode), [
              this.t.arrowFunctionExpression(
                [this.t.identifier("$thisIf")],
                this.t.blockStatement([ifStatement])
              )
            ]
          )
        )
      ])
    )
  }

  /**
   *  ${dlNodeName}.updateCond()
   */
  private updateIfNodeCond(dlNodeName: string) {
    return (
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(dlNodeName),
            this.t.identifier("updateCond")
          ),
          []
        )
      )
    )
  }

  /**
   *  ${dlNodeName}.update(changed)
   */
  private updateIfNode(dlNodeName: string) {
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

  // ---- @Env ----
  private resolveEnv(envParticle: EnvParticle): t.Statement[] {
    const [statements, collect] = this.statementsCollector()
    const { key, value } = envParticle

    return statements
  }

  // ---- Utils ----
  /**
   *
   * @param dependencies
   * @returns
   */
  private calcDependencyNum(dependencies: number[] | undefined): number {
    if (!dependencies || dependencies.length === 0) return 0
    return dependencies.reduce((acc, dep) => acc + (1 << dep), 0)
  }

  private findBestNodeAndPath(nameMap: Record<string, number[]>, path: number[], defaultName: string): [string, number[], number] {
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
        if (offset > 0 && offset <= 2) {
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
        return [bestHalfMatch[0], path.slice(bestHalfMatch[1] + 1), bestHalfMatch[2]]
      }
      return [defaultName, path, 0]
    }
    return [bestMatchName, path.slice(bestMatchCount), 0]
  }

  /**
   * @brief Check if the value is a member expression only node like this.xxx.bb.cc
   * @param value
   * @returns true if the value is a member expression only node
   */
  private isOnlyMemberExpression(value: t.Expression): boolean {
    if (!this.t.isMemberExpression(value)) return false
    while (value.property) {
      if (this.t.isMemberExpression(value.property)) {
        value = value.property
        continue
      } else if (this.t.isIdentifier(value.property)) break
      else return false
    }
    return true
  }

  private pathWithCommonPrefix(paths: number[][]) {
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

    const sortedPaths = allPaths.sort((a, b) => {
      if (a.length !== b.length) return a.length - b.length
      return a[0] - b[0]
    })

    const deduplicatedPaths = [...new Set(
      sortedPaths.map(path => path.join("."))
    )].map(path => path.split(".").filter(Boolean).map(Number))

    return deduplicatedPaths
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
