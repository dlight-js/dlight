import { type types as t } from "@babel/core"
import { DLError } from "../error"
import ForwardPropGenerator from "./ForwardPropGenerator"

export default class HTMLPropGenerator extends ForwardPropGenerator {
  static DelegatedEvents = new Set([
    "beforeinput",
    "click",
    "dblclick",
    "contextmenu",
    "focusin",
    "focusout",
    "input",
    "keydown",
    "keyup",
    "mousedown",
    "mousemove",
    "mouseout",
    "mouseover",
    "mouseup",
    "pointerdown",
    "pointermove",
    "pointerout",
    "pointerover",
    "pointerup",
    "touchend",
    "touchmove",
    "touchstart",
  ])

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
    dynamic: boolean,
    dependencyIndexArr: number[],
    dependenciesNode: t.ArrayExpression
  ): t.Statement | null {
    // ---- Dynamic HTML prop with init and update
    if (dynamic) {
      this.addUpdateStatements(
        dependencyIndexArr,
        this.setDynamicHTMLProp(name, tag, key, value, dependenciesNode, true)
      )
      return this.setDynamicHTMLProp(
        name,
        tag,
        key,
        value,
        dependenciesNode,
        false
      )
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
   * delegateEvent(${dlNodeName}, ${key}, ${value})
   */
  private delegateEvent(
    dlNodeName: string,
    key: string,
    value: t.Expression,
    check: boolean
  ): t.Statement {
    return this.setPropWithCheck(
      dlNodeName,
      this.t.callExpression(this.t.identifier(this.importMap.delegateEvent), [
        this.t.identifier(dlNodeName),
        this.t.stringLiteral(key),
        value,
      ]),
      check
    )
  }

  /**
   * @View
   * setHTMLProp(${dlNodeName}, ${key}, ${valueFunc}, ${dependenciesNode})
   */
  private setCachedProp(
    dlNodeName: string,
    key: string,
    value: t.Expression,
    dependenciesNode: t.ArrayExpression,
    check: boolean
  ): t.Statement {
    return this.setPropWithCheck(
      dlNodeName,
      this.t.callExpression(this.t.identifier(this.importMap.setHTMLProp), [
        this.t.identifier(dlNodeName),
        this.t.stringLiteral(key),
        this.t.arrowFunctionExpression([], value),
        dependenciesNode,
      ]),
      check
    )
  }

  /**
   * @View
   * setHTMLAttr(${dlNodeName}, ${key}, ${valueFunc}, ${dependenciesNode}, ${check})
   */
  private setCachedAttr(
    dlNodeName: string,
    key: string,
    value: t.Expression,
    dependenciesNode: t.ArrayExpression,
    check: boolean
  ): t.Statement {
    return this.setPropWithCheck(
      dlNodeName,
      this.t.callExpression(this.t.identifier(this.importMap.setHTMLAttr), [
        this.t.identifier(dlNodeName),
        this.t.stringLiteral(key),
        this.t.arrowFunctionExpression([], value),
        dependenciesNode,
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

  private static commonHTMLPropKeys = [
    "style",
    "dataset",
    "prop",
    "ref",
    "attr",
    "forwardProps",
    ...HTMLPropGenerator.lifecycle,
  ]

  /**
   * For style/dataset/ref/attr/prop
   */
  private addCommonHTMLProp(
    dlNodeName: string,
    attrName: string,
    value: t.Expression,
    check: boolean
  ): t.Statement | null {
    if (
      HTMLPropGenerator.lifecycle.includes(
        attrName as (typeof HTMLPropGenerator.lifecycle)[number]
      )
    ) {
      if (!check)
        return this.addLifecycle(
          dlNodeName,
          attrName as (typeof HTMLPropGenerator.lifecycle)[number],
          value
        )
      return null
    }
    if (attrName === "ref") {
      if (!check) return this.initElement(dlNodeName, value)
      return null
    }
    if (attrName === "style") return this.setHTMLStyle(dlNodeName, value, check)
    if (attrName === "dataset")
      return this.setHTMLDataset(dlNodeName, value, check)
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
  ): t.Statement | null {
    if (HTMLPropGenerator.commonHTMLPropKeys.includes(attrName))
      return this.addCommonHTMLProp(dlNodeName, attrName, value, false)
    if (attrName.startsWith("on")) {
      const eventName = attrName.slice(2).toLowerCase()
      if (HTMLPropGenerator.DelegatedEvents.has(eventName)) {
        return this.delegateEvent(dlNodeName, eventName, value, false)
      }
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
    dependenciesNode: t.ArrayExpression,
    check: boolean
  ): t.Statement | null {
    if (HTMLPropGenerator.commonHTMLPropKeys.includes(attrName))
      return this.addCommonHTMLProp(dlNodeName, attrName, value, check)
    if (attrName.startsWith("on")) {
      const eventName = attrName.slice(2).toLowerCase()
      if (HTMLPropGenerator.DelegatedEvents.has(eventName)) {
        return this.delegateEvent(dlNodeName, eventName, value, check)
      }
      return this.setEvent(dlNodeName, eventName, value, check)
    }
    if (this.alterAttributeMap[attrName]) {
      attrName = this.alterAttributeMap[attrName]
    }
    if (this.isInternalAttribute(tag, attrName)) {
      return this.setCachedProp(
        dlNodeName,
        attrName,
        value,
        dependenciesNode,
        check
      )
    }
    return this.setCachedAttr(
      dlNodeName,
      attrName,
      value,
      dependenciesNode,
      check
    )
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
