import { type types as t } from "@babel/core"
import { DLError } from "../error"
import ForwardPropGenerator from "./ForwardPropGenerator"

export default class HTMLPropGenerator extends ForwardPropGenerator {
  /**
   * @brief Add any HTML props according to the key
   * @param name
   * @param tag
   * @param key
   * @param value
   * @param dependencyIndexArr
   * @returns t.Statement
   */
  addHTMLProp(
    name: string,
    tag: string,
    key: string,
    value: t.Expression,
    dependencyIndexArr: number[] | undefined
  ): t.Statement {
    // ---- Dynamic HTML prop with init and update
    if (dependencyIndexArr && dependencyIndexArr.length > 0) {
      this.addUpdateStatements(
        dependencyIndexArr,
        this.setDynamicHTMLProp(name, tag, key, value, true)
      )
      return this.setDynamicHTMLProp(name, tag, key, value, false)
    }
    // ---- Static HTML prop with init only
    return this.setStaticHTMLProp(name, tag, key, value)
  }

  /**
   * @View
   * insertNode(${dlNodeName}, ${childNodeName}, ${position})
   */
  insertNode(
    dlNodeName: string,
    childNodeName: string,
    position: number
  ): t.ExpressionStatement {
    return this.t.expressionStatement(
      this.t.callExpression(this.t.identifier(this.importMap.insertNode), [
        this.t.identifier(dlNodeName),
        this.t.identifier(childNodeName),
        this.t.numericLiteral(position),
      ])
    )
  }

  /**
   * @View
   * ${dlNodeName} && ${expression}
   */
  private setPropWithCheck(
    dlNodeName: string,
    expression: t.Expression,
    check: boolean
  ): t.Statement {
    if (check) {
      return this.optionalExpression(dlNodeName, expression)
    }
    return this.t.expressionStatement(expression)
  }

  /**
   * @View
   * setStyle(${dlNodeName}, ${value})
   */
  private setHTMLStyle(
    dlNodeName: string,
    value: t.Expression,
    check: boolean
  ): t.Statement {
    return this.setPropWithCheck(
      dlNodeName,
      this.t.callExpression(this.t.identifier(this.importMap.setStyle), [
        this.t.identifier(dlNodeName),
        value,
      ]),
      check
    )
  }

  /**
   * @View
   * setStyle(${dlNodeName}, ${value})
   */
  private setHTMLDataset(
    dlNodeName: string,
    value: t.Expression,
    check: boolean
  ): t.Statement {
    return this.setPropWithCheck(
      dlNodeName,
      this.t.callExpression(this.t.identifier(this.importMap.setDataset), [
        this.t.identifier(dlNodeName),
        value,
      ]),
      check
    )
  }

  /**
   * @View
   * ${dlNodeName}.${key} = ${value}
   */
  private setHTMLProp(
    dlNodeName: string,
    key: string,
    value: t.Expression
  ): t.Statement {
    return this.t.expressionStatement(
      this.t.assignmentExpression(
        "=",
        this.t.memberExpression(
          this.t.identifier(dlNodeName),
          this.t.identifier(key)
        ),
        value
      )
    )
  }

  /**
   * @View
   * ${dlNodeName}.setAttribute(${key}, ${value})
   */
  private setHTMLAttr(
    dlNodeName: string,
    key: string,
    value: t.Expression
  ): t.Statement {
    return this.t.expressionStatement(
      this.t.callExpression(
        this.t.memberExpression(
          this.t.identifier(dlNodeName),
          this.t.identifier("setAttribute")
        ),
        [this.t.stringLiteral(key), value]
      )
    )
  }

  /**
   * @View
   * ${dlNodeName}.addEventListener(${key}, ${value})
   */
  private setHTMLEvent(
    dlNodeName: string,
    key: string,
    value: t.Expression
  ): t.Statement {
    return this.t.expressionStatement(
      this.t.callExpression(
        this.t.memberExpression(
          this.t.identifier(dlNodeName),
          this.t.identifier("addEventListener")
        ),
        [this.t.stringLiteral(key), value]
      )
    )
  }

  /**
   * @View
   * setEvent(${dlNodeName}, ${key}, ${value})
   */
  private setEvent(
    dlNodeName: string,
    key: string,
    value: t.Expression,
    check: boolean
  ): t.Statement {
    return this.setPropWithCheck(
      dlNodeName,
      this.t.callExpression(this.t.identifier(this.importMap.setEvent), [
        this.t.identifier(dlNodeName),
        this.t.stringLiteral(key),
        value,
      ]),
      check
    )
  }

  /**
   * @View
   * setHTMLProp(${dlNodeName}, ${key}, ${value})
   */
  private setCachedProp(
    dlNodeName: string,
    key: string,
    value: t.Expression,
    check: boolean
  ): t.Statement {
    return this.setPropWithCheck(
      dlNodeName,
      this.t.callExpression(this.t.identifier(this.importMap.setHTMLProp), [
        this.t.identifier(dlNodeName),
        this.t.stringLiteral(key),
        value,
      ]),
      check
    )
  }

  /**
   * @View
   * setHTMLAttr(${dlNodeName}, ${key}, ${value})
   */
  private setCachedAttr(
    dlNodeName: string,
    key: string,
    value: t.Expression,
    check: boolean
  ): t.Statement {
    return this.setPropWithCheck(
      dlNodeName,
      this.t.callExpression(this.t.identifier(this.importMap.setHTMLAttr), [
        this.t.identifier(dlNodeName),
        this.t.stringLiteral(key),
        value,
      ]),
      check
    )
  }

  /**
   * @View
   * setHTMLProps(${dlNodeName}, ${value})
   */
  private setHTMLPropObject(
    dlNodeName: string,
    value: t.Expression,
    check: boolean
  ): t.Statement {
    return this.setPropWithCheck(
      dlNodeName,
      this.t.callExpression(this.t.identifier(this.importMap.setHTMLProps), [
        this.t.identifier(dlNodeName),
        value,
      ]),
      check
    )
  }

  /**
   * @View
   * setHTMLAttrs(${dlNodeName}, ${value})
   */
  private setHTMLAttrObject(
    dlNodeName: string,
    value: t.Expression,
    check: boolean
  ): t.Statement {
    return this.setPropWithCheck(
      dlNodeName,
      this.t.callExpression(this.t.identifier(this.importMap.setHTMLAttrs), [
        this.t.identifier(dlNodeName),
        value,
      ]),
      check
    )
  }

  private readonly commonHTMLPropKeys = [
    "style",
    "dataset",
    "element",
    "prop",
    "attr",
    "forwardProps",
  ]

  /**
   * For style/dataset/element/attr/prop
   */
  private addCommonHTMLProp(
    dlNodeName: string,
    attrName: string,
    value: t.Expression,
    check: boolean
  ): t.Statement {
    if (attrName === "style") return this.setHTMLStyle(dlNodeName, value, check)
    if (attrName === "dataset")
      return this.setHTMLDataset(dlNodeName, value, check)
    if (attrName === "element")
      return this.setElement(dlNodeName, value, false, check)
    if (attrName === "prop")
      return this.setHTMLPropObject(dlNodeName, value, check)
    if (attrName === "attr")
      return this.setHTMLAttrObject(dlNodeName, value, check)
    if (attrName === "forwardProps") return this.forwardProps(dlNodeName)
    return DLError.throw2()
  }

  /**
   * @View
   * 1. Event listener
   *  - ${dlNodeName}.addEventListener(${key}, ${value})
   * 2. HTML internal attribute -> DOM property
   *  - ${dlNodeName}.${key} = ${value}
   * 3. HTML custom attribute
   *  - ${dlNodeName}.setAttribute(${key}, ${value})
   */
  private setStaticHTMLProp(
    dlNodeName: string,
    tag: string,
    attrName: string,
    value: t.Expression
  ): t.Statement {
    if (this.commonHTMLPropKeys.includes(attrName))
      return this.addCommonHTMLProp(dlNodeName, attrName, value, false)
    if (attrName.startsWith("on")) {
      const eventName = attrName.slice(2).toLowerCase()
      return this.setHTMLEvent(dlNodeName, eventName, value)
    }
    if (this.isInternalAttribute(tag, attrName)) {
      if (attrName === "class") attrName = "className"
      else if (attrName === "for") attrName = "htmlFor"
      return this.setHTMLProp(dlNodeName, attrName, value)
    }
    return this.setHTMLAttr(dlNodeName, attrName, value)
  }

  /**
   * @View
   * 1. Event listener
   *  - ${setEvent}(${dlNodeName}, ${key}, ${value})
   * 2. HTML internal attribute -> DOM property
   *  - ${setHTMLProp}(${dlNodeName}, ${key}, ${value})
   * 3. HTML custom attribute
   *  - ${setHTMLAttr}(${dlNodeName}, ${key}, ${value})
   */
  private setDynamicHTMLProp(
    dlNodeName: string,
    tag: string,
    attrName: string,
    value: t.Expression,
    check: boolean
  ): t.Statement {
    if (this.commonHTMLPropKeys.includes(attrName))
      return this.addCommonHTMLProp(dlNodeName, attrName, value, check)
    if (attrName.startsWith("on")) {
      const eventName = attrName.slice(2).toLowerCase()
      return this.setEvent(dlNodeName, eventName, value, check)
    }
    if (this.isInternalAttribute(tag, attrName)) {
      if (attrName === "class") attrName = "className"
      else if (attrName === "for") attrName = "htmlFor"
      return this.setCachedProp(dlNodeName, attrName, value, check)
    }
    return this.setCachedAttr(dlNodeName, attrName, value, check)
  }

  /**
   * @brief Check if the attribute is internal, i.e., can be accessed as js property
   * @param tag
   * @param attribute
   * @returns true if the attribute is internal
   */
  isInternalAttribute(tag: string, attribute: string): boolean {
    return (
      this.elementAttributeMap["*"]?.includes(attribute) ||
      this.elementAttributeMap[tag]?.includes(attribute)
    )
  }
}
