import {
  type TemplateProp,
  type ReactivityParserConfig,
  type MutableParticle,
  type ViewParticle,
  type TemplateParticle,
  type TextParticle,
  type HTMLParticle,
  type DependencyProp,
  type ExpParticle,
  type CompParticle,
  type ForParticle,
  type IfParticle,
  type EnvParticle,
  type SubviewParticle,
  SwitchParticle,
  TryParticle,
} from "./types"
import { type NodePath, type types as t, type traverse } from "@babel/core"
import {
  type TextUnit,
  type HTMLUnit,
  type ViewUnit,
  type CompUnit,
  type ViewProp,
  type ForUnit,
  type IfUnit,
  type EnvUnit,
  type ExpUnit,
  type SubviewUnit,
  SwitchUnit,
  TryUnit,
} from "@dlightjs/view-parser"
import { DLError } from "./error"

export class ReactivityParser {
  private readonly config: ReactivityParserConfig

  private readonly t: typeof t
  private readonly traverse: typeof traverse
  private readonly availableProperties: string[]
  private readonly availableIdentifiers?: string[]
  private readonly dependencyMap: Record<string, string[]>
  private readonly identifierDepMap: Record<string, string[]>
  private readonly dependencyParseType
  private readonly reactivityFuncNames

  private readonly escapeNamings = ["escape", "$"]
  private static readonly customHTMLProps = [
    "didUpdate",
    "willMount",
    "didMount",
    "willUnmount",
    "didUnmount",
    "element",
    "innerHTML",
    "prop",
    "attr",
    "dataset",
    "forwardProps",
  ]

  readonly usedProperties = new Set<string>()

  /**
   * @brief Constructor
   * @param viewUnit
   * @param config
   * @param options
   */
  constructor(config: ReactivityParserConfig) {
    this.config = config
    this.t = config.babelApi.types
    this.traverse = config.babelApi.traverse
    this.availableProperties = config.availableProperties
    this.availableIdentifiers = config.availableIdentifiers
    this.dependencyMap = config.dependencyMap
    this.identifierDepMap = config.identifierDepMap ?? {}
    this.dependencyParseType = config.dependencyParseType ?? "property"
    this.reactivityFuncNames = config.reactivityFuncNames ?? []
  }

  /**
   * @brief Parse the ViewUnit into a ViewParticle
   * @returns
   */
  parse(viewUnit: ViewUnit): ViewParticle {
    return this.parseViewUnit(viewUnit)
  }

  /**
   * @brief Parse a ViewUnit into a ViewParticle
   * @param viewUnit
   * @returns ViewParticle
   */
  private parseViewUnit(viewUnit: ViewUnit): ViewParticle {
    if (this.isHTMLTemplate(viewUnit))
      return this.parseTemplate(viewUnit as HTMLUnit)
    if (viewUnit.type === "text") return this.parseText(viewUnit)
    if (viewUnit.type === "html") return this.parseHTML(viewUnit)
    if (viewUnit.type === "comp") return this.parseComp(viewUnit)
    if (viewUnit.type === "for") return this.parseFor(viewUnit)
    if (viewUnit.type === "try") return this.parseTry(viewUnit)
    if (viewUnit.type === "if") return this.parseIf(viewUnit)
    if (viewUnit.type === "env") return this.parseEnv(viewUnit)
    if (viewUnit.type === "exp") return this.parseExp(viewUnit)
    if (viewUnit.type === "switch") return this.parseSwitch(viewUnit)
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
   * @returns TemplateParticle
   */
  private parseTemplate(htmlUnit: HTMLUnit): TemplateParticle {
    return {
      type: "template",
      template: this.generateTemplate(htmlUnit),
      props: this.parseTemplateProps(htmlUnit),
      mutableParticles: this.generateMutableParticles(htmlUnit),
    }
  }

  /**
   * @brief Generate a template
   *  There'll be a situation where the tag is dynamic, e.g. tag(this.htmlTag),
   *  which we can't generate a template string for it, so we'll wrap it in an ExpParticle in parseHTML() section
   * @param htmlUnit
   * @returns template string
   */
  private generateTemplate(unit: HTMLUnit): HTMLParticle {
    const staticProps = this.filterTemplateProps(
      // ---- Get all the static props
      Object.entries(unit.props).filter(
        ([, prop]) =>
          this.isStaticProp(prop) &&
          // ---- Filter out props with false values
          !(this.t.isBooleanLiteral(prop.value) && !prop.value.value)
      )
    ).map(([key, prop]) => [
      key,
      {
        ...prop,
        dependencyIndexArr: [],
        dependenciesNode: this.t.arrayExpression([]),
        dynamic: false,
      },
    ])

    let children: ViewParticle[] = []
    if (!unit.props.textContent) {
      children = unit.children
        .map(unit => {
          if (unit.type === "html" && this.t.isStringLiteral(unit.tag)) {
            return this.generateTemplate(unit)
          }
          if (unit.type === "text" && this.t.isStringLiteral(unit.content)) {
            return this.parseText(unit)
          }
        })
        .filter(Boolean) as HTMLParticle[]
    }
    return {
      type: "html",
      tag: unit.tag,
      props: Object.fromEntries(staticProps),
      children,
    }
  }

  /**
   * @brief Collect all the mutable nodes in a static HTMLUnit
   *  We use this function to collect mutable nodes' path and props,
   *  so that in the generator, we know which position to insert the mutable nodes
   * @param htmlUnit
   * @returns mutable particles
   */
  private generateMutableParticles(htmlUnit: HTMLUnit): MutableParticle[] {
    const mutableParticles: MutableParticle[] = []
    const generateMutableUnit = (unit: HTMLUnit, path: number[] = []) => {
      // ---- Generate mutable particles for current HTMLUnit
      unit.children?.forEach((child, idx) => {
        if (
          !(child.type === "html" && this.t.isStringLiteral(child.tag)) &&
          !(child.type === "text" && this.t.isStringLiteral(child.content))
        ) {
          mutableParticles.push({
            path: [...path, idx],
            ...this.parseViewParticle(child),
          })
        }
      })
      // ---- Recursively generate mutable particles for static HTMLUnit children
      unit.children
        ?.filter(
          child => child.type === "html" && this.t.isStringLiteral(child.tag)
        )
        .forEach((child, idx) => {
          generateMutableUnit(child as HTMLUnit, [...path, idx])
        })
    }
    generateMutableUnit(htmlUnit)

    return mutableParticles
  }

  /**
   * @brief Collect all the props in a static HTMLUnit or its nested HTMLUnit or TextUnit children
   *  Just like the mutable nodes, props are also equipped with path,
   *  so that we know which HTML ChildNode to insert the props
   * @param htmlUnit
   * @returns props
   */
  private parseTemplateProps(htmlUnit: HTMLUnit): TemplateProp[] {
    const templateProps: TemplateProp[] = []
    const generateVariableProp = (unit: HTMLUnit, path: number[]) => {
      // ---- Generate all non-static(string/number/boolean) props for current HTMLUnit
      //      to be inserted further in the generator
      Object.entries(unit.props)
        .filter(([, prop]) => !this.isStaticProp(prop))
        .forEach(([key, prop]) => {
          templateProps.push({
            tag: (unit.tag as t.StringLiteral).value,
            key,
            path,
            value: prop.value,
            ...this.getDependencies(prop.value),
          })
        })
      // ---- Recursively generate props for static HTMLUnit children
      unit.children
        .filter(
          child =>
            (child.type === "html" && this.t.isStringLiteral(child.tag)) ||
            (child.type === "text" && this.t.isStringLiteral(child.content))
        )
        .forEach((child, idx) => {
          if (child.type === "html") {
            generateVariableProp(child, [...path, idx])
          } else if (child.type === "text") {
            // ---- if the child is a TextUnit, we just insert the text content
            templateProps.push({
              tag: "text",
              key: "value",
              path: [...path, idx],
              value: child.content,
              dependencyIndexArr: [],
              dependenciesNode: this.t.arrayExpression([]),
              dynamic: false,
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
   * @returns TextParticle
   */
  private parseText(textUnit: TextUnit): TextParticle {
    return {
      type: "text",
      content: {
        value: textUnit.content,
        ...this.getDependencies(textUnit.content),
      },
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
   * @returns ExpParticle | HTMLParticle
   */
  private parseHTML(htmlUnit: HTMLUnit): ExpParticle | HTMLParticle {
    const { dependencyIndexArr, dependenciesNode, dynamic } =
      this.getDependencies(htmlUnit.tag)

    const innerHTMLParticle: HTMLParticle = {
      type: "html",
      tag: htmlUnit.tag,
      props: {},
      children: [],
    }

    innerHTMLParticle.props = Object.fromEntries(
      Object.entries(htmlUnit.props).map(([key, prop]) => [
        key,
        this.generateDependencyProp(prop),
      ])
    )

    innerHTMLParticle.children = htmlUnit.children.map(
      this.parseViewParticle.bind(this)
    )

    // ---- Not a dynamic tag
    if (!dynamic) return innerHTMLParticle

    // ---- Dynamic tag, wrap it in an ExpParticle to make the tag reactive
    const id = this.uid()
    return {
      type: "exp",
      content: {
        value: this.t.stringLiteral(id),
        viewPropMap: {
          [id]: [innerHTMLParticle],
        },
        dependencyIndexArr,
        dependenciesNode,
        dynamic,
      },
      props: {},
    }
  }

  // ---- @Comp ----
  /**
   * @brief Parse a CompUnit into a CompParticle or an ExpParticle
   *  Similar to parseHTML(), we detect dependencies in the tag, if there's no dependency,
   *  we parse it as a regular CompParticle, otherwise we wrap it with an ExpParticle.
   * @param compUnit
   * @returns CompParticle | ExpParticle
   */
  private parseComp(compUnit: CompUnit): CompParticle | ExpParticle {
    const { dependencyIndexArr, dependenciesNode, dynamic } =
      this.getDependencies(compUnit.tag)

    const compParticle: CompParticle = {
      type: "comp",
      tag: compUnit.tag,
      props: {},
      children: [],
    }

    compParticle.props = Object.fromEntries(
      Object.entries(compUnit.props).map(([key, prop]) => [
        key,
        this.generateDependencyProp(prop),
      ])
    )
    compParticle.children = compUnit.children.map(
      this.parseViewParticle.bind(this)
    )

    if (!dynamic) return compParticle

    const id = this.uid()
    return {
      type: "exp",
      content: {
        value: this.t.stringLiteral(id),
        viewPropMap: {
          [id]: [compParticle],
        },
        dependencyIndexArr,
        dependenciesNode,
        dynamic,
      },
      props: {},
    }
  }

  // ---- @For ----
  /**
   * @brief Parse a ForUnit into a ForParticle with dependencies
   *  Key and item doesn't need to be reactive, so here we don't collect dependencies for it
   * @param forUnit
   * @returns ForParticle
   */
  private parseFor(forUnit: ForUnit): ForParticle {
    const { dependencyIndexArr, dependenciesNode, dynamic } =
      this.getDependencies(forUnit.array)
    const prevIdentifierDepMap = this.config.identifierDepMap
    // ---- Find all the identifiers in the key and remove them from the identifierDepMap
    //      because once the key is changed, that identifier related dependencies will be changed too,
    //      so no need to update them
    const keyDep = this.t.isIdentifier(forUnit.key) && forUnit.key.name
    // ---- Generate an identifierDepMap to track identifiers in item and make them reactive
    //      based on the dependencies from the array
    this.config.identifierDepMap = Object.fromEntries(
      this.getIdentifiers(
        this.t.assignmentExpression(
          "=",
          forUnit.item,
          this.t.objectExpression([])
        )
      )
        .filter(id => !keyDep || id !== keyDep)
        .map(id => [
          id,
          dependencyIndexArr.map(n => this.availableProperties[n]),
        ])
    )

    const forParticle: ForParticle = {
      type: "for",
      item: forUnit.item,
      array: {
        value: forUnit.array,
        dynamic,
        dependencyIndexArr,
        dependenciesNode,
      },
      children: forUnit.children.map(this.parseViewParticle.bind(this)),
      key: forUnit.key,
    }
    this.config.identifierDepMap = prevIdentifierDepMap
    return forParticle
  }

  // ---- @If ----
  /**
   * @brief Parse an IfUnit into an IfParticle with dependencies
   * @param ifUnit
   * @returns IfParticle
   */
  private parseIf(ifUnit: IfUnit): IfParticle {
    return {
      type: "if",
      branches: ifUnit.branches.map(branch => ({
        condition: {
          value: branch.condition,
          ...this.getDependencies(branch.condition),
        },
        children: branch.children.map(this.parseViewParticle.bind(this)),
      })),
    }
  }

  // ---- @Switch ----
  /**
   * @brief Parse a SwitchUnit into an SwitchParticle with dependencies
   * @param switchUnit
   * @returns SwitchParticle
   */
  private parseSwitch(switchUnit: SwitchUnit): SwitchParticle {
    return {
      type: "switch",
      discriminant: {
        value: switchUnit.discriminant,
        ...this.getDependencies(switchUnit.discriminant),
      },
      branches: switchUnit.branches.map(branch => ({
        case: {
          value: branch.case,
          ...this.getDependencies(branch.case),
        },
        children: branch.children.map(this.parseViewParticle.bind(this)),
        break: branch.break,
      })),
    }
  }

  // ---- @Try ----
  /**
   * @brief Parse a TryUnit into an TryParticle with dependencies
   * @param tryUnit
   * @returns TryParticle
   */
  private parseTry(tryUnit: TryUnit): TryParticle {
    return {
      type: "try",
      children: tryUnit.children.map(this.parseViewParticle.bind(this)),
      exception: tryUnit.exception,
      catchChildren: tryUnit.catchChildren.map(
        this.parseViewParticle.bind(this)
      ),
    }
  }

  // ---- @Env ----
  /**
   * @brief Parse an EnvUnit into an EnvParticle with dependencies
   * @param envUnit
   * @returns EnvParticle
   */
  private parseEnv(envUnit: EnvUnit): EnvParticle {
    return {
      type: "env",
      props: Object.fromEntries(
        Object.entries(envUnit.props).map(([key, prop]) => [
          key,
          this.generateDependencyProp(prop),
        ])
      ),
      children: envUnit.children.map(this.parseViewParticle.bind(this)),
    }
  }

  // ---- @Exp ----
  /**
   * @brief Parse an ExpUnit into an ExpParticle with dependencies
   * @param expUnit
   * @returns ExpParticle
   */
  private parseExp(expUnit: ExpUnit): ExpParticle {
    const expParticle: ExpParticle = {
      type: "exp",
      content: this.generateDependencyProp(expUnit.content),
      props: Object.fromEntries(
        Object.entries(expUnit.props).map(([key, prop]) => [
          key,
          this.generateDependencyProp(prop),
        ])
      ),
    }
    return expParticle
  }

  // ---- @Subview ----
  /**
   * @brief Parse a SubviewUnit into a SubviewParticle with dependencies
   * @param subviewUnit
   * @returns SubviewParticle
   */
  private parseSubview(subviewUnit: SubviewUnit): SubviewParticle {
    const subviewParticle: SubviewParticle = {
      type: "subview",
      tag: subviewUnit.tag,
      props: {},
      children: [],
    }
    if (subviewUnit.props) {
      subviewParticle.props = Object.fromEntries(
        Object.entries(subviewUnit.props).map(([key, prop]) => [
          key,
          this.generateDependencyProp(prop),
        ])
      )
    }
    if (subviewUnit.children) {
      subviewParticle.children = subviewUnit.children.map(
        this.parseViewParticle.bind(this)
      )
    }

    return subviewParticle
  }

  // ---- Dependencies ----
  /**
   * @brief Generate a dependency prop with dependencies
   * @param prop
   * @returns DependencyProp
   */
  private generateDependencyProp(prop: ViewProp): DependencyProp {
    const dependencyProp: DependencyProp = {
      value: prop.value,
      ...this.getDependencies(prop.value),
      viewPropMap: Object.fromEntries(
        Object.entries(prop.viewPropMap).map(([key, units]) => [
          key,
          units.map(this.parseViewParticle.bind(this)),
        ])
      ),
    }
    return dependencyProp
  }

  /**
   * @brief Get all the dependencies of a node
   *  this.dependencyParseType controls how we parse the dependencies
   * 1. property: parse the dependencies of a node as a property, e.g. this.name
   * 2. identifier: parse the dependencies of a node as an identifier, e.g. name
   * The availableProperties is the list of all the properties that can be used in the template,
   * no matter it's a property or an identifier
   * @param node
   * @returns dependency index array
   */
  private getDependencies(node: t.Expression | t.Statement): {
    dynamic: boolean
    dependencyIndexArr: number[]
    dependenciesNode: t.ArrayExpression
  } {
    if (
      this.t.isFunctionExpression(node) ||
      this.t.isArrowFunctionExpression(node)
    ) {
      return {
        dynamic: false,
        dependencyIndexArr: [],
        dependenciesNode: this.t.arrayExpression([]),
      }
    }
    // ---- Both id and prop deps need to be calculated because
    //      id is for subview update, prop is normal update
    //      in a subview, the depsNode should be both id and prop
    const [directIdentifierDeps, identifierDepNodes] =
      this.getIdentifierDependencies(node)
    const [directPropertyDeps, propertyDepNodes] =
      this.getPropertyDependencies(node)
    const directDependencies =
      this.dependencyParseType === "identifier"
        ? directIdentifierDeps
        : directPropertyDeps
    const identifierMapDependencies = this.getIdentifierMapDependencies(node)
    const deps = [
      ...new Set([...directDependencies, ...identifierMapDependencies]),
    ]

    const depNodes = [
      ...identifierDepNodes,
      ...propertyDepNodes,
    ] as t.Expression[]

    return {
      dynamic: depNodes.length > 0 || deps.length > 0,
      dependencyIndexArr: deps,
      dependenciesNode: this.t.arrayExpression(depNodes),
    }
  }

  /**
   * @brief Get all the dependencies of a node if a property is a valid dependency as
   *  1. the identifier is in the availableProperties
   *  2. the identifier is a stand alone identifier
   *  3. the identifier is not in an escape function
   *  4. the identifier is not in a manual function
   *  5. the identifier is not the left side of an assignment expression, which is an assignment expression
   *  6. the identifier is not the right side of an assignment expression, which is an update expression
   * @param node
   * @returns dependency index array
   */
  private getIdentifierDependencies(
    node: t.Expression | t.Statement
  ): [number[], t.Node[]] {
    const availableIdentifiers =
      this.availableIdentifiers ?? this.availableProperties

    const deps = new Set<string>()
    const assignDeps = new Set<string>()
    const depNodes: Record<string, t.Node[]> = {}

    const wrappedNode = this.valueWrapper(node)
    this.traverse(wrappedNode, {
      Identifier: innerPath => {
        const identifier = innerPath.node
        const idName = identifier.name
        if (!availableIdentifiers.includes(idName)) return
        if (
          this.isAssignmentExpressionLeft(innerPath) ||
          this.isAssignmentFunction(innerPath)
        ) {
          assignDeps.add(idName)
        } else if (
          this.isStandAloneIdentifier(innerPath) &&
          !this.isMemberInEscapeFunction(innerPath) &&
          !this.isMemberInManualFunction(innerPath)
        ) {
          deps.add(idName)
          this.dependencyMap[idName]?.forEach(deps.add.bind(deps))
          if (!depNodes[idName]) depNodes[idName] = []
          depNodes[idName].push(this.geneDependencyNode(innerPath))
        }
      },
    })

    assignDeps.forEach(dep => {
      deps.delete(dep)
      delete depNodes[dep]
    })
    let dependencyNodes = Object.values(depNodes).flat()
    // ---- deduplicate the dependency nodes
    dependencyNodes = dependencyNodes.filter((n, i) => {
      const idx = dependencyNodes.findIndex(m => this.t.isNodesEquivalent(m, n))
      return idx === i
    })

    deps.forEach(this.usedProperties.add.bind(this.usedProperties))
    return [
      [...deps].map(dep => this.availableProperties.indexOf(dep)),
      dependencyNodes,
    ]
  }

  /**
   * @brief Get all the dependencies of a node if a member expression is a valid dependency as
   *  1. the property is in the availableProperties
   *  2. the object is this
   *  3. the member expression is not in an escape function
   *  4. the member expression is not in a manual function
   *  5. the member expression is not the left side of an assignment expression, which is an assignment expression
   *  6. the member is not a pure function declaration
   * @param node
   * @returns dependency index array
   */
  private getPropertyDependencies(
    node: t.Expression | t.Statement
  ): [number[], t.Node[]] {
    const deps = new Set<string>()
    const assignDeps = new Set<string>()
    const depNodes: Record<string, t.Node[]> = {}

    const wrappedNode = this.valueWrapper(node)
    this.traverse(wrappedNode, {
      MemberExpression: innerPath => {
        if (
          !this.t.isIdentifier(innerPath.node.property) ||
          !this.t.isThisExpression(innerPath.node.object)
        )
          return
        const propertyKey = innerPath.node.property.name
        if (
          this.isAssignmentExpressionLeft(innerPath) ||
          this.isAssignmentFunction(innerPath)
        ) {
          assignDeps.add(propertyKey)
        } else if (
          this.availableProperties.includes(propertyKey) &&
          !this.isMemberInEscapeFunction(innerPath) &&
          !this.isMemberInManualFunction(innerPath)
        ) {
          deps.add(propertyKey)
          this.dependencyMap[propertyKey]?.forEach(deps.add.bind(deps))
          if (!depNodes[propertyKey]) depNodes[propertyKey] = []
          depNodes[propertyKey].push(this.geneDependencyNode(innerPath))
        }
      },
    })

    assignDeps.forEach(dep => {
      deps.delete(dep)
      delete depNodes[dep]
    })
    let dependencyNodes = Object.values(depNodes).flat()
    // ---- deduplicate the dependency nodes
    dependencyNodes = dependencyNodes.filter((n, i) => {
      const idx = dependencyNodes.findIndex(m => this.t.isNodesEquivalent(m, n))
      return idx === i
    })

    deps.forEach(this.usedProperties.add.bind(this.usedProperties))
    return [
      [...deps].map(dep => this.availableProperties.indexOf(dep)),
      dependencyNodes,
    ]
  }

  /**
   * @brief Generate a dependency node from a dependency identifier,
   *  loop until the parent node is not a binary expression or a member expression
   * @param path
   * @returns
   */
  private geneDependencyNode(path: NodePath): t.Node {
    let parentPath = path
    while (parentPath?.parentPath) {
      const pParentPath = parentPath.parentPath
      if (
        !(
          this.t.isBinaryExpression(pParentPath.node) ||
          this.t.isMemberExpression(pParentPath.node)
        )
      ) {
        return parentPath.node
      }
      parentPath = pParentPath
    }
    return path.node
  }

  /**
   * @brief Get dependencies from the identifierDepMap
   *  e.g.
   *  map: { "a": ["dep1", "dep2"] }
   *  expression: const b = a
   *  deps for b: ["dep1", "dep2"]
   * @param node
   * @returns dependency index array
   */
  private getIdentifierMapDependencies(
    node: t.Expression | t.Statement
  ): number[] {
    const deps = new Set<string>()

    const wrappedNode = this.valueWrapper(node)
    this.traverse(wrappedNode, {
      Identifier: innerPath => {
        const identifier = innerPath.node
        const idName = identifier.name
        if (this.isAttrFromFunction(innerPath, idName)) return
        const depsArray = this.identifierDepMap[idName]

        if (!depsArray || !Array.isArray(depsArray)) return
        if (
          this.isMemberInEscapeFunction(innerPath) ||
          this.isMemberInManualFunction(innerPath)
        )
          return
        depsArray.forEach(deps.add.bind(deps))
      },
    })

    deps.forEach(this.usedProperties.add.bind(this.usedProperties))
    return [...deps].map(dep => this.availableProperties.indexOf(dep))
  }

  // ---- Utils ----
  /**
   * @brief Parse a ViewUnit into a ViewParticle by new-ing a ReactivityParser
   * @param viewUnit
   * @returns ViewParticle
   */
  private parseViewParticle(viewUnit: ViewUnit): ViewParticle {
    const parser = new ReactivityParser(this.config)
    const parsedUnit = parser.parse(viewUnit)
    // ---- Collect used properties
    parser.usedProperties.forEach(
      this.usedProperties.add.bind(this.usedProperties)
    )
    return parsedUnit
  }

  /**
   * @brief Check if a ViewUnit is a static HTMLUnit that can be parsed into a template
   *  Must satisfy:
   *  1. type is html
   *  2. tag is a string literal, i.e., non-dynamic tag
   *  3. has at least one child that is a static HTMLUnit,
   *     or else just call a createElement function, no need for template clone
   * @param viewUnit
   * @returns is a static HTMLUnit
   */
  private isHTMLTemplate(viewUnit: ViewUnit): boolean {
    return (
      viewUnit.type === "html" &&
      this.t.isStringLiteral(viewUnit.tag) &&
      !!viewUnit.children?.some(
        child => child.type === "html" && this.t.isStringLiteral(child.tag)
      )
    )
  }

  /**
   * @brief Check if a prop is a static prop
   *  i.e.
   *  1. no viewPropMap
   *  2. value is a string/number/boolean literal
   * @param prop
   * @returns is a static prop
   */
  private isStaticProp(prop: ViewProp): boolean {
    const { value, viewPropMap } = prop
    return (
      (!viewPropMap || Object.keys(viewPropMap).length === 0) &&
      (this.t.isStringLiteral(value) ||
        this.t.isNumericLiteral(value) ||
        this.t.isBooleanLiteral(value))
    )
  }

  /**
   * @brief Filter out some props that are not needed in the template,
   *  these are all special props to be parsed differently in the generator
   * @param props
   * @returns filtered props
   */
  private filterTemplateProps<T>(
    props: Array<[string, T]>
  ): Array<[string, T]> {
    return (
      props
        // ---- Filter out event listeners
        .filter(([key]) => !key.startsWith("on"))
        // ---- Filter out specific props
        .filter(([key]) => !ReactivityParser.customHTMLProps.includes(key))
    )
  }

  /**
   * @brief Wrap the value in a file
   * @param node
   * @returns wrapped value
   */
  private valueWrapper(node: t.Expression | t.Statement): t.File {
    return this.t.file(
      this.t.program([
        this.t.isStatement(node) ? node : this.t.expressionStatement(node),
      ])
    )
  }

  /**
   * @brief Check if an identifier is a simple stand alone identifier,
   *  i.e., not a member expression, nor a function param
   * @param path
   *  1. not a member expression
   *  2. not a function param
   *  3. not in a declaration
   *  4. not as object property's not computed key
   * @returns is a stand alone identifier
   */
  private isStandAloneIdentifier(path: NodePath<t.Identifier>): boolean {
    const node = path.node
    const parentNode = path.parentPath?.node
    const isMemberExpression =
      this.t.isMemberExpression(parentNode) && parentNode.property === node
    if (isMemberExpression) return false
    const isFunctionParam = this.isAttrFromFunction(path, node.name)
    if (isFunctionParam) return false
    while (path.parentPath) {
      if (this.t.isVariableDeclarator(path.parentPath.node)) return false
      if (
        this.t.isObjectProperty(path.parentPath.node) &&
        path.parentPath.node.key === path.node &&
        !path.parentPath.node.computed
      )
        return false
      path = path.parentPath as NodePath<t.Identifier>
    }
    return true
  }

  /**
   * @brief Get all identifiers as strings in a node
   * @param node
   * @returns identifiers
   */
  private getIdentifiers(node: t.Node): string[] {
    if (this.t.isIdentifier(node)) return [node.name]
    const identifierKeys = new Set<string>()
    this.traverse(this.valueWrapper(node as t.Expression), {
      Identifier: innerPath => {
        if (!this.isStandAloneIdentifier(innerPath)) return
        identifierKeys.add(innerPath.node.name)
      },
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
  private isAttrFromFunction(path: NodePath, idName: string) {
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
        return param.elements
          .filter(Boolean)
          .map(el => checkParam(el!))
          .includes(true)
      }
      if (this.t.isObjectPattern(param)) {
        return (
          param.properties.filter(
            prop =>
              this.t.isObjectProperty(prop) && this.t.isIdentifier(prop.key)
          ) as t.ObjectProperty[]
        )
          .map(prop => (prop.key as t.Identifier).name)
          .includes(idName)
      }
      if (this.t.isRestElement(param)) return checkParam(param.argument)

      return false
    }

    while (reversePath) {
      const node = reversePath.node
      if (
        this.t.isArrowFunctionExpression(node) ||
        this.t.isFunctionDeclaration(node)
      ) {
        for (const param of node.params) {
          if (checkParam(param)) return true
        }
      }
      reversePath = reversePath.parentPath
    }

    return false
  }

  /**
   * @brief Check if it's the left side of an assignment expression, e.g. this.count = 1
   * @param innerPath
   * @returns is left side of an assignment expression
   */
  private isAssignmentExpressionLeft(innerPath: NodePath): boolean {
    let parentPath = innerPath.parentPath
    while (parentPath && !this.t.isStatement(parentPath.node)) {
      if (this.t.isAssignmentExpression(parentPath.node)) {
        if (parentPath.node.left === innerPath.node) return true
        const leftPath = parentPath.get("left") as NodePath
        if (innerPath.isDescendant(leftPath)) return true
      } else if (this.t.isUpdateExpression(parentPath.node)) {
        return true
      }
      parentPath = parentPath.parentPath
    }

    return false
  }

  /**
   * @brief Check if it's a reactivity function, e.g. arr.push
   * @param innerPath
   * @returns
   */
  private isAssignmentFunction(innerPath: NodePath): boolean {
    let parentPath = innerPath.parentPath

    while (parentPath && this.t.isMemberExpression(parentPath.node)) {
      parentPath = parentPath.parentPath
    }
    if (!parentPath) return false
    return (
      this.t.isCallExpression(parentPath.node) &&
      this.t.isMemberExpression(parentPath.node.callee) &&
      this.t.isIdentifier(parentPath.node.callee.property) &&
      this.reactivityFuncNames.includes(parentPath.node.callee.property.name)
    )
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
      const isManual =
        this.t.isCallExpression(parentNode) &&
        this.t.isIdentifier(parentNode.callee) &&
        parentNode.callee.name === "manual"
      const isFirstParam =
        this.t.isCallExpression(parentNode) && parentNode.arguments[0] === node
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
