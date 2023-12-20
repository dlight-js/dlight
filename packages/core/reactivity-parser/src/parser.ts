import { type TemplateProp, type ReactivityParserConfig, type ReactivityParserOption, type mutableParticle, type ViewParticle, type TemplateParticle, type TextParticle, type HTMLParticle, type DependencyProp, type ExpParticle, type CompParticle, type ForParticle, type IfParticle, type EnvParticle, type SubviewParticle } from "./types"
import { type NodePath, type types as t, type traverse } from "@babel/core"
import { type TextUnit, type HTMLUnit, type ViewUnit, type CompUnit, type ViewProp, type ForUnit, type IfUnit, type EnvUnit, type ExpUnit, type SubviewUnit } from "@dlightjs/view-parser"
import { DLError } from "./error"
import { recoverHTMLAttrName } from "./attr"

export class ReactivityParser {
  private readonly viewUnit: ViewUnit
  private readonly config: ReactivityParserConfig
  private readonly options?: ReactivityParserOption

  private readonly t: typeof t
  private readonly traverse: typeof traverse
  private readonly availableProperties: string[]
  private readonly dependencyMap: Record<string, string[]>
  private readonly identifierDepMap: Record<string, string[]>

  private readonly escapeNamings = ["escape", "$"]

  readonly usedProperties = new Set<string>()

  /**
   * @brief Constructor
   * @param viewUnit
   * @param config
   * @param options
   */
  constructor(
    viewUnit: ViewUnit,
    config: ReactivityParserConfig,
    options?: ReactivityParserOption
  ) {
    this.viewUnit = viewUnit
    this.config = config
    this.options = options
    this.t = config.babelApi.types
    this.traverse = config.babelApi.traverse
    this.availableProperties = config.availableProperties
    this.dependencyMap = config.dependencyMap
    this.identifierDepMap = config.identifierDepMap ?? {}
    options?.escapeNamings && (this.escapeNamings = options.escapeNamings)
  }

  /**
   * @brief Parse the ViewUnit into a ViewParticle
   * @returns
   */
  parse(): ViewParticle {
    return this.parseViewUnit(this.viewUnit)
  }

  /**
   * @brief Parse a ViewUnit into a ViewParticle
   * @param viewUnit
   * @returns
   */
  private parseViewUnit(viewUnit: ViewUnit): ViewParticle {
    if (this.isHTMLTemplate(viewUnit)) return this.parseTemplate(viewUnit as HTMLUnit)
    if (viewUnit.type === "text") return this.parseText(viewUnit)
    if (viewUnit.type === "html") return this.parseHTML(viewUnit)
    if (viewUnit.type === "comp") return this.parseComp(viewUnit)
    if (viewUnit.type === "for") return this.parseFor(viewUnit)
    if (viewUnit.type === "if") return this.parseIf(viewUnit)
    if (viewUnit.type === "env") return this.parseEnv(viewUnit)
    if (viewUnit.type === "exp") return this.parseExp(viewUnit)
    if (viewUnit.type === "subview") return this.parseSubview(viewUnit)
    return DLError.throw1()
  }

  // ---- Parsers ----
  // ---- @Template ----
  /**
   * @brief Collect static HTMLUnit into a template particle and generate a template string
   *  MutableParticle means whatever unit that is not a static HTMLUnit or a TextUnit
   *  Props means all the non-static props of the nested HTMLUnit or TextUnit, e.g. div().className(this.name)
   * @param htmlUnit
   * @returns
   */
  private parseTemplate(htmlUnit: HTMLUnit): TemplateParticle {
    return {
      type: "template",
      template: this.generateTemplateString(htmlUnit),
      props: this.parseTemplateProps(htmlUnit),
      mutableParticles: this.generateMutableParticles(htmlUnit)
    }
  }

  /**
   * @brief Generate a template string from a static HTMLUnit
   *  There'll be a situation where the tag is dynamic, e.g. tag(this.htmlTag),
   *  which we can't generate a template string for it, so we'll wrap it in an ExpParticle in parseHTML() section
   * @param htmlUnit
   * @returns
   */
  private generateTemplateString(htmlUnit: HTMLUnit): string {
    let templateString = ""
    const generateString = (unit: HTMLUnit) => {
      const tagName = (unit.tag as t.StringLiteral).value
      const staticProps = this.filterTemplateProps(
        Object.entries(unit.props ?? [])
          .filter(([, prop]) => (
            this.isStaticProp(prop) &&
            // ---- Filter out props with false values
            !(this.t.isBooleanLiteral(prop.value) && !prop.value.value)
          ))
          .map<[string, string | boolean]>(([key, { value }]) => (
          [recoverHTMLAttrName(key), (value as t.StringLiteral).value]
        ))
      )

      const propString = staticProps
        .map(([key, value]) => (value === true
          ? ` ${key}`
          : ` ${key}="${value}"`)
        ).join("")
      templateString += `<${tagName}${propString}>`

      // ---- ChildParticles
      if (unit.content) {
        if (this.isStaticProp(unit.content)) {
          templateString += (unit.content.value as t.StringLiteral).value
        }
      }
      unit.children?.forEach(unit => {
        if (unit.type === "html" && this.t.isStringLiteral(unit.tag)) {
          generateString(unit)
          return
        }
        if (unit.type === "text" && this.t.isStringLiteral(unit.content)) {
          templateString += unit.content.value
        }
      })

      templateString += `</${tagName}>`
    }
    generateString(htmlUnit)

    return templateString
  }

  /**
   * @brief Collect all the mutable nodes in a static HTMLUnit
   *  We use this function to collect mutable nodes' path and props,
   *  so that in the generator, we know which position to insert the mutable nodes
   * @param htmlUnit
   * @returns
   */
  private generateMutableParticles(htmlUnit: HTMLUnit): mutableParticle[] {
    const mutableParticles: mutableParticle[] = []
    const generateMutableUnit = (unit: HTMLUnit, path: number[]) => {
      unit.children?.forEach((child, idx) => {
        if (child.type === "html" && this.t.isStringLiteral(child.tag)) {
          generateMutableUnit(child, [...path, idx])
        } else if (child.type !== "text") {
          mutableParticles.push({
            path: [...path, idx],
            ...this.parseViewParticle(child)
          })
        }
      })
    }
    generateMutableUnit(htmlUnit, [])

    return mutableParticles
  }

  /**
   * @brief Collect all the props in a static HTMLUnit or its nested HTMLUnit or TextUnit children
   *  Just like the mutable nodes, props are also equipped with path,
   *  so that we know which HTML ChildNode to insert the props
   * @param htmlUnit
   * @returns
   */
  private parseTemplateProps(htmlUnit: HTMLUnit): TemplateProp[] {
    const templateProps: TemplateProp[] = []
    const generateVariableProp = (unit: HTMLUnit, path: number[]) => {
      Object.entries({ ...unit.props ?? {}, ...(unit.content ? { textContent: unit.content } : {}) })
        .filter(([, prop]) => !this.isStaticProp(prop))
        .forEach(([key, prop]) => {
          const dependencyIndexArr = this.getDependencies(prop.value)
          templateProps.push({
            tag: (unit.tag as t.StringLiteral).value,
            key,
            path,
            value: prop.value,
            dependencyIndexArr
          })
        })
      unit.children
        ?.filter(child => (
          (child.type === "html" && this.t.isStringLiteral(child.tag)) ||
          (child.type === "text")
        ))
        .forEach((child, idx) => {
          if (child.type === "html") {
            generateVariableProp(child, [...path, idx])
          } else if (child.type === "text") {
            const dependencyIndexArr = this.getDependencies(child.content)
            templateProps.push({
              tag: "text",
              key: "value",
              path: [...path, idx],
              value: child.content,
              dependencyIndexArr
            })
          }
        })
    }
    generateVariableProp(htmlUnit, [])

    return templateProps
  }

  // ---- @Text ----
  /**
   * @brief Parse a TextUnit into a TextParticle.
   *  This is only for a top level TextUnit, because if nested in HTMLUnit, it'll be parsed in the template string
   * @param textUnit
   * @returns
   */
  private parseText(textUnit: TextUnit): TextParticle {
    return {
      type: "text",
      content: {
        value: textUnit.content,
        dependencyIndexArr: this.getDependencies(textUnit.content)
      }
    }
  }

  // ---- @HTML ----
  /**
   * @brief Parse an HTMLUnit with a dynamic tag into an ExpParticle or an HTMLParticle
   *  We detect dependencies in the tag, if there's no dependency,
   *  we parse it as an HTMLParticle and dynamically append it to the parent node;
   *  if there's dependency, we parse it as an ExpParticle and wrap it in an ExpParticle
   *  so that we can make the tag reactive
   * @param htmlUnit
   * @returns
   */
  private parseHTML(htmlUnit: HTMLUnit): ExpParticle | HTMLParticle {
    const tagDependencies = this.getDependencies(htmlUnit.tag)

    const innerHTMLParticle: HTMLParticle = {
      type: "html",
      tag: {
        value: htmlUnit.tag,
        dependencyIndexArr: tagDependencies
      }
    }

    if (htmlUnit.props) {
      if (htmlUnit.content) {
        htmlUnit.props.textContent = htmlUnit.content
      }
      innerHTMLParticle.props = Object.fromEntries(
        Object.entries(htmlUnit.props).map(([key, prop]) => ([key, this.generateDependencyProp(prop)]))
      )
    }
    if (htmlUnit.children) {
      innerHTMLParticle.children = htmlUnit.children.map(this.parseViewParticle.bind(this))
    }

    // ---- Not a dynamic tag
    if (tagDependencies.length === 0) return innerHTMLParticle

    // ---- Dynamic tag, wrap it in an ExpParticle to make the tag reactive
    const id = this.uid()
    return {
      type: "exp",
      content: {
        value: this.t.stringLiteral(id),
        viewPropMap: {
          [id]: [innerHTMLParticle]
        }
      }
    }
  }

  // ---- @Comp ----
  /**
   * @brief Parse a CompUnit into a CompParticle or an ExpParticle
   *  Similar to parseHTML(), we detect dependencies in the tag, if there's no dependency,
   *  we parse it as a regular CompParticle, otherwise we wrap it with an ExpParticle.
   * @param compUnit
   * @returns
   */
  private parseComp(compUnit: CompUnit): CompParticle | ExpParticle {
    const tagDependencies = this.getDependencies(compUnit.tag)

    const compParticle: CompParticle = {
      type: "comp",
      tag: {
        value: compUnit.tag,
        dependencyIndexArr: tagDependencies
      }
    }

    if (compUnit.content) {
      compParticle.content = this.generateDependencyProp(compUnit.content)
    }
    if (compUnit.props) {
      compParticle.props = Object.fromEntries(
        Object.entries(compUnit.props).map(([key, prop]) => [key, this.generateDependencyProp(prop)])
      )
    }
    if (compUnit.children) {
      compParticle.children = compUnit.children.map(this.parseViewParticle.bind(this))
    }

    if (tagDependencies.length === 0) return compParticle

    const id = this.uid()
    return {
      type: "exp",
      content: {
        value: this.t.stringLiteral(id),
        viewPropMap: {
          [id]: [compParticle]
        }
      }
    }
  }

  // ---- @For ----
  /**
   * @brief Parse a ForUnit into a ForParticle with dependencies
   *  Key doesn't need to be reactive, so here we don't collect dependencies for it
   * @param forUnit
   * @returns
   */
  private parseFor(forUnit: ForUnit): ForParticle {
    const dependencyIndexArr = this.getDependencies(forUnit.array)
    const prevIdentifierDepMap = this.config.identifierDepMap
    const keyDep = this.t.isIdentifier(forUnit.key) && forUnit.key.name
    this.config.identifierDepMap = Object.fromEntries(
      this.getIdentifiers(
        this.t.assignmentExpression("=", forUnit.item, this.t.identifier("temp"))
      )
        .filter(id => !keyDep || id !== keyDep)
        .map(id => [id, dependencyIndexArr.map(n => this.availableProperties[n])])
    )
    const forParticle: ForParticle = {
      type: "for",
      item: forUnit.item,
      array: {
        value: forUnit.array,
        dependencyIndexArr
      },
      children: forUnit.children.map(this.parseViewParticle.bind(this)),
      key: forUnit.key
    }
    this.config.identifierDepMap = prevIdentifierDepMap
    return forParticle
  }

  // ---- @If ----
  /**
   * @brief Parse an IfUnit into an IfParticle with dependencies
   * @param ifUnit
   * @returns
   */
  private parseIf(ifUnit: IfUnit): IfParticle {
    return {
      type: "if",
      branches: ifUnit.branches.map(branch => ({
        condition: {
          value: branch.condition,
          dependencyIndexArr: this.getDependencies(branch.condition)
        },
        children: branch.children.map(this.parseViewParticle.bind(this))
      }))
    }
  }

  // ---- @Env ----
  /**
   * @brief Parse an EnvUnit into an EnvParticle with dependencies
   * @param envUnit
   * @returns
   */
  private parseEnv(envUnit: EnvUnit): EnvParticle {
    return {
      type: "env",
      props: Object.fromEntries(
        Object.entries(envUnit.props).map(([key, prop]) => [key, this.generateDependencyProp(prop)])
      ),
      children: envUnit.children.map(this.parseViewParticle.bind(this))
    }
  }

  // ---- @Exp ----
  /**
   * @brief Parse an ExpUnit into an ExpParticle with dependencies
   * @param expUnit
   * @returns
   */
  private parseExp(expUnit: ExpUnit): ExpParticle {
    const expParticle: ExpParticle = {
      type: "exp",
      content: this.generateDependencyProp(expUnit.content)
    }
    if (expUnit.props) {
      expParticle.props = Object.fromEntries(
        Object.entries(expUnit.props).map(([key, prop]) => [key, this.generateDependencyProp(prop)])
      )
    }
    return expParticle
  }

  // ---- @Subview ----
  /**
   * @brief Parse a SubviewUnit into a SubviewParticle with dependencies
   * @param subviewUnit
   * @returns
   */
  private parseSubview(subviewUnit: SubviewUnit): SubviewParticle | ExpParticle {
    const tagDependencies = this.getDependencies(subviewUnit.tag)
    const subviewParticle: SubviewParticle = {
      type: "subview",
      tag: {
        value: subviewUnit.tag,
        dependencyIndexArr: tagDependencies
      }
    }
    if (subviewUnit.props) {
      subviewParticle.props = Object.fromEntries(
        Object.entries(subviewUnit.props).map(([key, prop]) => [key, this.generateDependencyProp(prop)])
      )
    }
    if (subviewUnit.children) {
      subviewParticle.children = subviewUnit.children.map(this.parseViewParticle.bind(this))
    }

    if (tagDependencies.length === 0) return subviewParticle
    const id = this.uid()
    return {
      type: "exp",
      content: {
        value: this.t.stringLiteral(id),
        viewPropMap: {
          [id]: [subviewParticle]
        }
      }
    }
  }

  // ---- Dependencies ----
  /**
   * @brief Generate a dependency prop with dependencies
   * @param prop
   * @returns
   */
  private generateDependencyProp(prop: ViewProp): DependencyProp {
    const dependencyProp: DependencyProp = {
      value: prop.value,
      dependencyIndexArr: this.getDependencies(prop.value)
    }
    if (prop.viewPropMap) {
      dependencyProp.viewPropMap = Object.fromEntries(
        Object.entries(prop.viewPropMap).map(([key, units]) => [
          key,
          units.map(this.parseViewParticle.bind(this))
        ])
      )
    }
    return dependencyProp
  }

  private getDependencies(node: t.Expression | t.Statement): number[] {
    return [...new Set([...this.getDirectDependencies(node), ...this.getIdentifierDependencies(node)])]
  }

  /**
   * @brief Get all the dependencies of a node if a member expression is a valid dependency as
   *  1. the property is in the availableProperties
   *  2. the object is this
   *  3. the member expression is not in an escape function
   *  4. the member expression is not in a manual function
   *  5. the member expression is not the left side of an assignment expression, which is an assignment expression
   *  6. the member expression is not the right side of an assignment expression, which is an update expression
   * @param node
   * @returns
   */
  private getDirectDependencies(node: t.Expression | t.Statement): number[] {
    const deps = new Set<string>()

    const wrappedNode = this.valueWrapper(node)
    this.traverse(wrappedNode, {
      MemberExpression: innerPath => {
        if (!this.t.isIdentifier(innerPath.node.property)) return
        const propertyKey = innerPath.node.property.name
        if (
          this.availableProperties.includes(propertyKey) &&
          this.t.isThisExpression(innerPath.node.object) &&
          !this.isMemberInEscapeFunction(innerPath) &&
          !this.isMemberInManualFunction(innerPath) &&
          !this.isAssignmentExpressionLeft(innerPath) &&
          !this.isAssignmentExpressionRight(innerPath)
        ) {
          deps.add(propertyKey)
          this.dependencyMap[propertyKey]?.forEach(deps.add.bind(deps))
        }
      }
    })

    deps.forEach(this.usedProperties.add.bind(this.usedProperties))
    return [...deps].map(dep => this.availableProperties.indexOf(dep))
  }

  private getIdentifierDependencies(node: t.Expression | t.Statement): number[] {
    const deps = new Set<string>()

    const wrappedNode = this.valueWrapper(node)
    this.traverse(wrappedNode, {
      Identifier: innerPath => {
        const identifier = innerPath.node
        const idName = identifier.name
        if (this.isAttrFromFunction(innerPath, idName, node)) return
        const depsArray = this.identifierDepMap[idName]

        if (!depsArray) return
        if (
          !this.isMemberInEscapeFunction(innerPath) &&
          !this.isMemberInManualFunction(innerPath)
        ) {
          depsArray.forEach(deps.add.bind(deps))
        }
      }
    })

    deps.forEach(this.usedProperties.add.bind(this.usedProperties))
    return [...deps].map(dep => this.availableProperties.indexOf(dep))
  }

  /**
   * @brief Parse a ViewUnit into a ViewParticle by new-ing a ReactivityParser
   * @param viewUnit
   * @returns
   */
  private parseViewParticle(viewUnit: ViewUnit) {
    const parser = new ReactivityParser(viewUnit, this.config, this.options)
    const parsedUnit = parser.parse()
    parser.usedProperties.forEach(this.usedProperties.add.bind(this.usedProperties))
    return parsedUnit
  }

  // ---- Utils ----
  /**
   * @brief Check if a ViewUnit is a static HTMLUnit that can be parsed into a template
   *  Must satisfy:
   *  1. type is html
   *  2. tag is a string literal, i.e., non-dynamic tag
   *  3. has at least one child that is a static HTMLUnit,
   *     or else just call a createElement function, no need for template clone
   * @param viewUnit
   * @returns
   */
  private isHTMLTemplate(viewUnit: ViewUnit): boolean {
    return (
      viewUnit.type === "html" &&
      this.t.isStringLiteral(viewUnit.tag) &&
      !!viewUnit.children?.some(child => (
        child.type === "html" && this.t.isStringLiteral(child.tag)
      ))
    )
  }

  private isStaticProp(prop: ViewProp): boolean {
    const { value, viewPropMap } = prop
    return (
      (!viewPropMap || Object.keys(viewPropMap).length === 0) &&
      (this.t.isStringLiteral(value) || this.t.isNumericLiteral(value) || this.t.isBooleanLiteral(value))
    )
  }

  /**
   * @brief Filter out some props that are not needed in the template
   * @param props
   * @returns
   */
  private filterTemplateProps<T>(props: Array<[string, T]>): Array<[string, T]> {
    return props
      // ---- Filter out event listeners
      .filter(([key]) => (
        !key.startsWith("on")
      ))
      // ---- Filter out specific props
      .filter(([key]) => (
        !["element", "innerHTML", "prop", "attr", "dataset"].includes(key)
      ))
  }

  /**
   * @brief Wrap the value in a file
   * @param node
   * @returns wrapped value
   */
  private valueWrapper(node: t.Expression | t.Statement): t.File {
    return this.t.file(this.t.program([
      this.t.isStatement(node)
        ? node
        : this.t.expressionStatement(node)
    ]))
  }

  /**
   * @brief Get all identifiers as strings in a node
   * @param node
   * @returns identifiers
   */
  private getIdentifiers(node: t.Node): string[] {
    if (this.t.isIdentifier(node)) return [node.name]
    const identifierKeys = new Set<string>()
    this.traverse(this.valueWrapper(node as any), {
      Identifier: innerPath => {
        if (this.t.isObjectProperty(innerPath.parentPath.node)) return
        if (!this.t.isIdentifier(innerPath.node)) return
        identifierKeys.add(innerPath.node.name)
      },
      ObjectProperty: innerPath => {
        if (!this.t.isIdentifier(innerPath.node.value)) return
        identifierKeys.add(innerPath.node.value.name)
      }
    })
    return [...identifierKeys]
  }

  /**
   * @brief check if the identifier is from a function param till the stopNode
   *  e.g:
   *  function myFunc1(ok) { // stopNode = functionBody
   *     const myFunc2 = ok => ok // from function param
   *     console.log(ok) // not from function param
   *  }
   */
  private isAttrFromFunction(path: NodePath, idName: string, stopNode: t.Node) {
    let reversePath = path.parentPath

    const checkParam: (param: t.Node) => boolean = (param: t.Node) => {
    // ---- 3 general types:
    //      * represent allow nesting
    // ---0 Identifier: (a)
    // ---1 RestElement: (...a)   *
    // ---1 Pattern: 3 sub Pattern
    // -----0   AssignmentPattern: (a=1)   *
    // -----1   ArrayPattern: ([a, b])   *
    // -----2   ObjectPattern: ({a, b})
      if (this.t.isIdentifier(param)) return param.name === idName
      if (this.t.isAssignmentPattern(param)) return checkParam(param.left)
      if (this.t.isArrayPattern(param)) {
        return param.elements.filter(Boolean).map((el) => checkParam(el!)).includes(true)
      }
      if (this.t.isObjectPattern(param)) {
        return (param.properties
          .filter(prop => this.t.isObjectProperty(prop) && this.t.isIdentifier(prop.key)) as t.ObjectProperty[])
          .map(prop => (prop.key as t.Identifier).name)
          .includes(idName)
      }
      if (this.t.isRestElement(param)) return checkParam(param.argument)

      return false
    }

    while (reversePath && reversePath.node !== stopNode) {
      const node = reversePath.node
      if (this.t.isArrowFunctionExpression(node) || this.t.isFunctionDeclaration(node)) {
        for (const param of node.params) {
          if (checkParam(param)) return true
        }
      }
      reversePath = reversePath.parentPath
    }
    if (this.t.isClassMethod(stopNode)) {
      for (const param of stopNode.params) {
        if (checkParam(param)) return true
      }
    }
    return false
  }

  /**
   * @brief Check if it's the left side of an assignment expression, e.g. this.count = 1
   * @param innerPath
   * @returns is left side of an assignment expression
   */
  private isAssignmentExpressionLeft(innerPath: NodePath): boolean {
    const parentNode = innerPath.parentPath?.node

    return (
      (this.t.isAssignmentExpression(parentNode) && parentNode.left === innerPath.node) ||
    this.t.isUpdateExpression(parentNode)
    )
  }

  /**
   * @brief Check if a member expression is the right side of an assignment expression
   *   e.g. this.count = this.count + 1
   * @param innerPath
   * @returns is the right side of an assignment expression
   */
  private isAssignmentExpressionRight(innerPath: NodePath<t.MemberExpression>): boolean {
    const currNode = innerPath.node

    let isRightExp = false
    let reversePath: NodePath<t.Node> | null = innerPath.parentPath
    while (reversePath) {
      if (this.t.isAssignmentExpression(reversePath.node)) {
        const leftNode = reversePath.node.left as t.MemberExpression
        const typeEqual = currNode.type === leftNode.type
        const identifierEqual = (currNode.property as t.Identifier).name === (leftNode.property as t.Identifier).name
        isRightExp = typeEqual && identifierEqual
      }
      reversePath = reversePath.parentPath
    }

    return isRightExp
  }

  /**
   * @brief Check if it's in an "escape" function,
   *        e.g. escape(() => { console.log(this.count) })
   *              deps will be empty instead of ["count"]
   * @param innerPath
   * @param classDeclarationNode
   * @returns is in escape function
   */
  private isMemberInEscapeFunction(innerPath: NodePath): boolean {
    let isInFunction = false
    let reversePath = innerPath.parentPath
    while (reversePath) {
      const node = reversePath.node
      if (
        this.t.isCallExpression(node) &&
        this.t.isIdentifier(node.callee) &&
        this.escapeNamings.includes(node.callee.name)
      ) {
        isInFunction = true
        break
      }
      reversePath = reversePath.parentPath
    }
    return isInFunction
  }

  /**
   * @brief Check if it's in a "manual" function,
   *        e.g. manual(() => { console.log(this.count) }, ["flag"])
   *             deps will be ["flag"] instead of ["count"]
   * @param innerPath
   * @param classDeclarationNode
   * @returns is in manual function
   */
  private isMemberInManualFunction(innerPath: NodePath): boolean {
    let isInFunction = false
    let reversePath = innerPath.parentPath

    while (reversePath) {
      const node = reversePath.node
      const parentNode = reversePath.parentPath?.node
      const isManual = (
        this.t.isCallExpression(parentNode) &&
        this.t.isIdentifier(parentNode.callee) &&
        parentNode.callee.name === "manual"
      )
      const isFirstParam = (
        this.t.isCallExpression(parentNode) &&
        parentNode.arguments[0] === node
      )
      if (isManual && isFirstParam) {
        isInFunction = true
        break
      }
      reversePath = reversePath.parentPath
    }

    return isInFunction
  }

  /**
   * @brief Generate a random string
   * @returns
   */
  private uid(): string {
    return Math.random().toString(36).slice(2)
  }
}