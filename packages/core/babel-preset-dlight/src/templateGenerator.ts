import { type ViewHTMLPropDynamic, type ViewUnit } from "./types"
import { type NodePath, type types as t } from "@babel/core"
import { isMemberInEscapeFunction, isMemberInManualFunction, isAssignmentExpressionLeft, isAssignmentExpressionRight } from "./utils/depChecker"

type MutableNode = MutableUnit & {
  path: number[]
}

interface DLNodePath {
  path: number[]
}

interface Prop {
  key: string
  value: t.Expression
  dependencies?: number[]
}

interface DynamicProp {
  key: string
  path: number[]
  value: t.Expression
  dependencies?: number[]
}

export interface ElementUnit {
  type: "html"
  template: string
  mutableNodes: Array<DLNodeUnit & DLNodePath>
  props: DynamicProp[]
}

export interface CustomUnit {
  type: "custom"
  class: t.Expression
  props?: Prop[]
  body?: DLNodeUnit[]
}

export interface MutableUnit {
  type: "mutable"
  viewUnit: ViewUnit
  body?: DLNodeUnit[] | DLNodeUnit[][]
}

export type DLNodeUnit = ElementUnit | MutableUnit | CustomUnit

export class DLNodeGenerator {
  private readonly viewParserUnit: ViewUnit
  private readonly t: typeof t
  private readonly classRootPath: NodePath<t.ClassDeclaration | t.ClassExpression>
  private readonly fullDepMap: Record<string, string[]>
  private readonly availableProperties: string[]

  readonly usedProperties = new Set<string>()

  constructor(
    types: typeof t,
    viewParserUnit: ViewUnit,
    classRootPath: NodePath<t.ClassDeclaration | t.ClassExpression>,
    fullDepMap: Record<string, string[]>,
    availableProperties: string[]
  ) {
    this.t = types
    this.viewParserUnit = viewParserUnit
    this.classRootPath = classRootPath
    this.fullDepMap = fullDepMap
    this.availableProperties = availableProperties
  }

  generate(): DLNodeUnit {
    if (this.viewParserUnit.type === "html") {
      return {
        type: "html",
        template: this.generateHtmlDLNode(),
        mutableNodes: this.generateMutableNodes(),
        props: this.generateHTMLProps()
      }
    }

    if (this.viewParserUnit.type === "custom") {
      return {
        type: "custom",
        class: this.viewParserUnit.tag,
        props: this.getCustomProps(),
        body: this.viewParserUnit.children?.map(this.generateDLNode.bind(this))
      }
    }

    const body = this.viewParserUnit.type === "if"
      ? this.viewParserUnit.conditions.map(({ body }) => (
        body.map(this.generateDLNode.bind(this))
      ))
      : (this.viewParserUnit.type === "exp" || this.viewParserUnit.type === "text")
          ? undefined
          : this.viewParserUnit.children?.map(this.generateDLNode.bind(this))

    return {
      isElement: false,
      viewUnit: this.viewParserUnit,
      body
    }
  }

  getCustomProps() {
    if (this.viewParserUnit.type !== "custom") return []
    const props: Prop[] = []
    if (this.viewParserUnit.content) {
      props.push({
        key: "content",
        value: this.viewParserUnit.content.value,
        dependencies: this.getDependencies(this.viewParserUnit.content.value)
      })
    }
    if (this.viewParserUnit.props) {
      Object.entries(this.viewParserUnit.props).forEach(([key, prop]) => {
        props.push({
          key,
          value: prop.value,
          dependencies: this.getDependencies(prop.value)
        })
      })
    }
    return props
  }

  /**
   * @brief Generate a template unit for a given html unit
   */
  generateHtmlDLNode(): string {
    let templateString = ""
    const generateString = (unit: ViewUnit) => {
      if (unit.type === "html") {
        const tagName = unit.tag as String
        const staticProps = unit.props
          ? Object.entries(unit.props)
            .filter(([key, prop]) => !("computed" in prop) && key !== "textContent") as Array<[string, ViewPropStatic]>
          : []
        const propString = staticProps.map(([key, { value }]) => ` ${key}="${value}"`).join("")
        templateString += `<${tagName}${propString}>`
        if (unit.children) unit.children.forEach(generateString)
        else if (unit.props?.textContent && !("computed" in unit.props.textContent)) {
          templateString += unit.props.textContent.value
        }
        templateString += `</${tagName}>`
      } else if (unit.type === "text") {
        if (!("computed" in unit)) {
          templateString += unit.content
        }
      }
    }
    generateString(this.viewParserUnit)

    return templateString
  }

  generateMutableNodes(): MutableNode[] {
    const mutableNodes: MutableNode[] = []
    const generateMutableUnit = (unit: ViewUnit, pat?: number[], index?: number) => {
      const path = pat ? [...pat, index!] : []
      if (unit.type === "html") {
        unit.children?.forEach((child, idx) => generateMutableUnit(child, path, idx))
      } else {
        mutableNodes.push({
          path,
          ...this.generateDLNode(unit) as MutableUnit
        })
      }
    }
    generateMutableUnit(this.viewParserUnit)

    return mutableNodes
  }

  generateHTMLProps(): DynamicProp[] {
    const variableProps: DynamicProp[] = []
    const generateVariableProp = (unit: ViewUnit, pat?: number[], index?: number) => {
      const path = pat ? [...pat, index!] : []
      if (unit.type === "html") {
        if (unit.props) {
          ;(Object.entries(unit.props)
            .filter(([, prop]) => "computed" in prop) as Array<[string, ViewHTMLPropDynamic]>)
            .forEach(([key, prop]) => {
              const dependencies = this.getDependencies(prop.value)
              variableProps.push({
                key,
                path,
                value: prop.value,
                dependencies
              })
            })
        }
        if (unit.children) {
          unit.children.forEach((child, idx) => generateVariableProp(child, path, idx))
        }
      }
    }
    generateVariableProp(this.viewParserUnit)

    return variableProps
  }

  /**
   * @brief Check if this unit and it's nested children are all of type HTML
   */
  isPureHtmlUnit(): boolean {
    const testIsPureHtmlUnit = (viewParserUnit: ViewUnit): boolean => {
      if (viewParserUnit.type !== "html") return false
      if (viewParserUnit.children) {
        return viewParserUnit.children.every(testIsPureHtmlUnit)
      }
      return true
    }
    return testIsPureHtmlUnit(this.viewParserUnit)
  }

  private getDependencies(node: t.Expression): number[] {
    const deps = new Set<string>()

    const wrappedNode = this.valueWrapper(node)
    this.classRootPath.scope.traverse(wrappedNode, {
      MemberExpression: innerPath => {
        if (!this.t.isIdentifier(innerPath.node.property)) return
        const propertyKey = innerPath.node.property.name
        if (
          this.availableProperties.includes(propertyKey) &&
          this.t.isThisExpression(innerPath.node.object) &&
          !isMemberInEscapeFunction(innerPath, wrappedNode, this.t) &&
          !isMemberInManualFunction(innerPath, wrappedNode, this.t) &&
          !isAssignmentExpressionLeft(innerPath, this.t) &&
          !isAssignmentExpressionRight(innerPath, wrappedNode, this.t)
        ) {
          deps.add(propertyKey)
          this.fullDepMap[propertyKey]?.forEach(deps.add.bind(deps))
        }
      }
    })

    deps.forEach(this.usedProperties.add.bind(this.usedProperties))
    return [...deps].map(dep => this.availableProperties.indexOf(dep))
  }

  /**
   * @brief Wrap the value with a variable declaration
   * const _ = ${value}
   * @param node
   * @returns wrapped value
   */
  private valueWrapper(node: t.Expression): t.VariableDeclaration {
    return this.t.variableDeclaration("const", [this.t.variableDeclarator(this.t.identifier("_"), node)])
  }

  generateDLNode(viewParserUnit: ViewUnit) {
    return new DLNodeGenerator(this.t, viewParserUnit, this.classRootPath, this.fullDepMap, this.availableProperties).generate()
  }
}

export function generateDLNode(
  types: typeof t,
  viewParserResult: ViewUnit[],
  classRootPath: NodePath<t.ClassDeclaration | t.ClassExpression>,
  fullDepMap: Record<string, string[]>,
  availableProperties: string[]
): [DLNodeUnit[], Set<string>] {
  const usedProperties = new Set<string>()
  const templateUnits = viewParserResult.map(u => {
    const generator = new DLNodeGenerator(types, u, classRootPath, fullDepMap, availableProperties)
    const unit = generator.generate()
    console.log(unit)
    generator.usedProperties.forEach(usedProperties.add.bind(usedProperties))
    return unit
  })

  return [templateUnits, usedProperties]
}
