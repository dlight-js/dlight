import { type CustomViewUnit, type EnvViewUnit, type ExpViewUnit, type ForViewUnit, type HTMLViewUnit, type IdentifierToDepNode, type IfViewUnit, type TextViewUnit, type ViewProp, type ViewUnit } from "../types"
import { type types as t, type NodePath } from "@babel/core"
import { uid } from "../utils/utils"
import { isMemberInEscapeFunction, isMemberInManualFunction, isAssignmentExpressionLeft, isAssignmentExpressionRight } from "../utils/depChecker"
import { type ElementUnit, type DLNodeUnit, type CustomUnit } from "./templateGenerator"

export class ViewGenerator {
  // ---- Const ----
  private readonly prefixMap = {
    template: "$t",
    node: "$n"
  }

  // ---- Prop ----
  private readonly t: typeof t
  private readonly templateUnits
  private readonly classRootPath
  private readonly className
  private readonly importMap
  // ---- Data ----
  private readonly bodyStatements: t.Statement[] = []
  private currentUnitIdx = 0

  constructor(
    types: typeof t,
    templateUnits: DLNodeUnit[],
    classRootPath: NodePath<t.ClassDeclaration | t.ClassExpression>,
    importMap: Record<string, string>
  ) {
    this.t = types
    this.templateUnits = templateUnits
    this.classRootPath = classRootPath
    this.className = classRootPath.node.id?.name ?? uid()
    this.importMap = importMap
  }

  /**
   * @brief Generate a view, called right after the constructor
   *  The reason why we don't generate the view in the constructor is that
   *  we accept class inheritance
   * @returns new generated view block statement
   */
  generate(): t.BlockStatement {
    this.templateUnits.forEach(templateUnit => {
      this.addStatement(...this.resolveViewUnit(templateUnit))
      this.currentUnitIdx++
    })
    this.addStatement(this.addUpdateFunction())
    this.addStatement(this.addReturnStatement())
    return this.t.blockStatement(this.bodyStatements)
  }

  /**
   * return [${nodeIdx}.map(name), update]
   */
  addReturnStatement() {
    return (
      this.t.returnStatement(
        this.t.arrayExpression([
          this.t.arrayExpression(
            Array.from({ length: this.currentUnitIdx })
              .map((_, idx) => this.t.identifier(`${this.prefixMap.node}${idx}`))
          ),
          this.t.identifier("update")
        ])
      )
    )
  }

  updateStatements: Record<number, t.Statement[]> = {}
  addUpdateStatements(dependencies: number[] | undefined, statement: t.Statement[]) {
    if (!dependencies || dependencies.length === 0) return
    const depNum = this.calcDependencyNum(dependencies)
    if (!this.updateStatements[depNum]) this.updateStatements[depNum] = []
    this.updateStatements[depNum].push(...statement)
  }

  /**
   * const updateFunc = (changed) => {
   *  if (changed & ${depNum}) {
   *   ${statements}
   * }
   */
  addUpdateFunction() {
    return (
      this.t.variableDeclaration(
        "const", [
          this.t.variableDeclarator(
            this.t.identifier("update"),
            this.t.arrowFunctionExpression(
              [this.t.identifier("changed")],
              this.t.blockStatement(
                Object.entries(this.updateStatements).map(([depNum, statements]) => (
                  this.t.ifStatement(
                    this.t.binaryExpression(
                      "&",
                      this.t.identifier("changed"),
                      this.t.numericLiteral(parseInt(depNum))
                    ),
                    this.t.blockStatement(statements)
                  )
                ))
              )
            )
          )
        ]
      )
    )
  }

  /**
   * @brief Add a statement to the body
   * @param statements
   */
  private addStatement(...statements: t.Statement[]) {
    this.bodyStatements.push(...statements)
  }

  /**
   * @brief Parse a view unit according to its type
   * @param viewUnit
   * @returns
   */
  private resolveViewUnit(templateUnit: DLNodeUnit): t.Statement[] {
    if (templateUnit.type === "html") return this.resolveElement(templateUnit)
    if (templateUnit.type === "custom") return this.resolveCustom(templateUnit)
    // if (this.isTextUnit(viewUnit)) return this.resolveText(viewUnit)
    // if (this.isHTMLUnit(viewUnit)) return this.resolveHTML(viewUnit)
    // if (this.isIfUnit(viewUnit)) return this.resolveIf(viewUnit)
    // if (this.isForUnit(viewUnit)) return this.resolveFor(viewUnit)
    // if (this.isExpUnit(viewUnit)) return this.resolveExp(viewUnit)
    // if (this.isEnvUnit(viewUnit)) return this.resolveEnv(viewUnit)
    // if (this.isSubViewUnit(viewUnit)) return this.resolveSubView(viewUnit)
    // return this.resolveCustom(viewUnit)
  }

  /**
   * @brief Resolve an element unit
   * @param elementUnit
   * @returns
   */
  resolveElement(elementUnit: ElementUnit): t.Statement[] {
    const [statements, collect] = statementsCollector()
    const { template, mutableNodes, props } = elementUnit
    const dlNodeName = this.generateDLNodeName()
    const templateName = this.declareDLNodes(template)
    collect(this.declareElement(dlNodeName, templateName))

    const nameMap: Record<string, number[]> = {}
    props.forEach(({ path, key, value, dependencies }) => {
      let [name, pat] = this.findBestNodeAndPath(nameMap, path, dlNodeName)
      if (pat.length !== 0) {
        const [statement, newName] = this.insertMutableNode(name, pat)
        name = newName
        nameMap[name] = path
        collect(statement)
      }

      const assignHTMLPropStatement = this.assignHTMLProp(name, key, value)
      collect(assignHTMLPropStatement)
      this.addUpdateStatements(dependencies, [assignHTMLPropStatement])
    })

    mutableNodes.forEach((node) => {
      const { type, path } = node
      if (type === "custom") {
        // ---- Parent htmlElement
        let [parentName, pat] = this.findBestNodeAndPath(nameMap, path.slice(0, -1), dlNodeName)
        if (pat.length !== 0) {
          const [statement, newName] = this.insertMutableNode(dlNodeName, pat)
          collect(statement)
          parentName = newName
        }
        const customStatements = this.resolveCustom(node, false)
        const customNodeName = `${this.prefixMap.node}$${this.declareNodeIdx - 1}`
        const insertStatement = this.insertNode(parentName, customNodeName, path[path.length - 1])
        customStatements.splice(-1, 0, insertStatement)
        collect(customStatements)
      }
    })

    return statements
  }

  calcDependencyNum(dependencies: number[]): number {
    return dependencies.reduce((acc, dep) => acc + 1 << dep, 0)
  }

  findBestNodeAndPath(nameMap: Record<string, number[]>, path: number[], defaultName: string): [string, number[]] {
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

  /**
   * const ${dlNodeName}_${path_path} = $getEl(${dlNodeName}, ...${path_path})
   */
  insertMutableNode(dlNodeName: string, path: number[]): [t.VariableDeclaration, string] {
    const name = this.generateDeclareDLNodeName()
    return [
      this.t.variableDeclaration(
        "const", [
          this.t.variableDeclarator(
            this.t.identifier(name),
            this.t.callExpression(
              this.t.identifier(this.importMap.getEl),
              [
                this.t.identifier(dlNodeName),
                ...path.map(p => this.t.numericLiteral(p))
              ]
            )
          )
        ]
      ),
      name
    ]
  }

  /**
   * $setProp(${name}, ${propName}, ${value})
   *  or
   * $setEvent(${name}, ${propName}, ${value})
   */
  assignHTMLProp(name: string, propName: string, value: t.Expression) {
    if (propName.startsWith("on")) {
      return (
        this.t.expressionStatement(
          this.t.callExpression(
            this.t.identifier(this.importMap.setEvent),
            [this.t.identifier(name), this.t.stringLiteral(propName.slice(2).toLowerCase()), value]
          )
        )
      )
    }
    return (
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.identifier(this.importMap.setProp),
          [this.t.identifier(name), this.t.stringLiteral(propName), value]
        )
      )
    )
  }

  /**
   * $insertNode(${parentName}, ${childName}, ${position})
   */
  insertNode(parentName: string, childName: string, position: number) {
    return (
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.identifier(this.importMap.insertNode),
          [this.t.identifier(parentName), this.t.identifier(childName), this.t.numericLiteral(position)]
        )
      )
    )
  }

  /* ---- Custom ---- */
  resolveCustom(customUnit: CustomUnit, directly = true): t.Statement[] {
    const [statements, collect] = statementsCollector()
    const dlNodeName = directly ? this.generateDLNodeName() : this.generateDeclareDLNodeName()
    collect(this.declareCustom(dlNodeName, customUnit.class))

    customUnit.props?.forEach(({ key, value, dependencies }) => {
      if (key === "content") {
        collect(this.assignCustomContentProp(dlNodeName, value))
        // this.addUpdateStatements(dependencies, [assignCustomPropStatement])
      } else {
        collect(this.assignCustomProp(dlNodeName, key, value))
        this.addUpdateStatements(dependencies, [this.changeCustomProp(dlNodeName, key, value)])
      }
    })

    collect(this.initCustom(dlNodeName))

    return statements
  }

  /**
   * const ${dlNodeName} = new ${nodeName}()
   */
  declareCustom(dlNodeName: string, classNode: t.Expression) {
    return (
      this.t.variableDeclaration(
        "const", [
          this.t.variableDeclarator(
            this.t.identifier(dlNodeName),
            this.t.newExpression(
              classNode, []
            )
          )
        ]
      )
    )
  }

  /**
   * $setDLProp(${dlNodeName}, ${propName}, ${value})
   */
  assignCustomProp(dlNodeName: string, propName: string, value: t.Expression) {
    return (
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.identifier(this.importMap.setDLProp),
          [this.t.identifier(dlNodeName), this.t.stringLiteral(propName), value]
        )
      )
    )
  }

  /**
   * $changeDLProp(${dlNodeName}, ${propName}, ${value})
   */
  changeCustomProp(dlNodeName: string, propName: string, value: t.Expression) {
    return (
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.identifier(this.importMap.changeDLProp),
          [this.t.identifier(dlNodeName), this.t.stringLiteral(propName), value]
        )
      )
    )
  }

  /**
   * $setDLContent(${dlNodeName}, ${propName}, ${value})
   */
  assignCustomContentProp(dlNodeName: string, value: t.Expression) {
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
   * $(dlNodeName)._$init
   */
  initCustom(dlNodeName: string) {
    return (
      this.t.expressionStatement(
        this.t.callExpression(
          this.t.memberExpression(
            this.t.identifier(dlNodeName),
            this.t.identifier("_$init")
          ),
          []
        )
      )
    )
  }

  /* ---- Helper Functions ---- */
  /**
   * @brief Declare a DLNode
   *  const ${dlNodeId} = new $${nodeName}()
   * @param dlNodeId
   * @param nodeName
   * @returns
   */
  private declareDLNode(dlNodeName: string, nodeName: string) {
    return this.t.variableDeclaration(
      "const", [
        this.t.variableDeclarator(
          this.t.identifier(dlNodeName),
          this.t.newExpression(
            this.t.identifier(`$${nodeName}`), []
          )
        )
      ]
    )
  }

  addClassProperty(name: string, value: t.Expression, _static = false) {
    this.classRootPath.node.body.body.push(
      this.t.classProperty(
        this.t.identifier(name),
        value,
        undefined,
        undefined,
        undefined,
        _static
      )
    )
  }

  /**
   * @brief Generate a DLNode name
   * @returns ${nodeNamePrefix}${currentUnitIdx}
   */
  nodeIdx = 0
  private generateDLNodeName(): string {
    return `${this.prefixMap.node}${this.nodeIdx++}`
  }

  declareNodeIdx = 0
  private generateDeclareDLNodeName(): string {
    return `${this.prefixMap.node}$${this.declareNodeIdx++}`
  }

  templateIdx = 0
  private generateTemplateName(): string {
    return `${this.prefixMap.template}${this.templateIdx++}`
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

  /**
   * @brief Shorthand method for generating a view body by duplicating this's parameters
   * @param viewResult
   * @returns view body
   */
  private generateView(templateUnits: DLNodeUnit[]): t.BlockStatement {
    return new ViewGenerator(this.t, templateUnits, this.classRootPath).generate()
  }

  /**
   * @brief Get all identifiers as strings in a node
   * @param node
   * @returns identifiers
   */
  private getIdentifiers(node: t.Node): string[] {
    if (this.t.isIdentifier(node)) return [node.name]
    const identifierKeys = new Set<string>()
    this.classRootPath.scope.traverse(node, {
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
   * @brief Wrap the value with a function declaration
   * function () {
   *  ${node}
   * }
   * @param node
   * @returns wrapped function
   */
  private functionWrapper(node: t.BlockStatement): t.FunctionDeclaration {
    return this.t.functionDeclaration(null, [], node)
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

  /**
   * This function should never return true, or IanDx to blame
   * @param node
   * @returns
   */
  private leftValCheck(node: t.Node): node is (
    t.MemberExpression
    | t.ArrayExpression
    | t.BinaryExpression
    | t.TSAsExpression
    | t.TSTypeAssertion
    | t.TSSatisfiesExpression
    | t.TSNonNullExpression
    | t.TSParameterProperty
  ) {
    return (
      this.t.isMemberExpression(node) ||
      this.t.isArrayExpression(node) ||
      this.t.isBinaryExpression(node) ||
      this.t.isTSAsExpression(node) ||
      this.t.isTSTypeAssertion(node) ||
      this.t.isTSSatisfiesExpression(node) ||
      this.t.isTSNonNullExpression(node) ||
      this.t.isTSParameterProperty(node)
    )
  }
}

/**
 * @brief Offer generator changing for inheriting usage
 */
let ViewGeneratorClass = ViewGenerator
export function changeViewGeneratorClass(newClass: typeof ViewGenerator) {
  ViewGeneratorClass = newClass
}

/**
 * @brief Generate a view body by duplicating this's parameters
 * @param types
 * @param viewResult
 * @param classRootPath
 * @param fullDepMap
 * @param subViewNames
 * @param identifierToDepsMap
 * @returns [view body, used properties]
 */
export function generateView(
  types: typeof t,
  templateUnits: DLNodeUnit[],
  classRootPath: NodePath<t.ClassDeclaration | t.ClassExpression>,
  importMap: Record<string, string>
): t.BlockStatement {
  const viewGenerator = new ViewGeneratorClass(
    types,
    templateUnits,
    classRootPath,
    importMap
  )
  return viewGenerator.generate()
}

/**
 * @brief Collect statements and provide a collect function
 * @returns [statements, collect]
 */
function statementsCollector(): [t.Statement[], (...statements: t.Statement[] | t.Statement[][]) => void] {
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
