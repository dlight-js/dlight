import { type types as t } from "@babel/core"
import BaseGenerator from "./BaseGenerator"
import { DLError } from "./error"
import { isInternalAttribute } from "./attr"

export default class HTMLPropGenerator extends BaseGenerator {
  addHTMLProp(name: string, tag: string, key: string, value: t.Expression, dependencyIndexArr: number[] | undefined) {
    if (dependencyIndexArr && dependencyIndexArr.length > 0) {
      this.addUpdateStatements(dependencyIndexArr, [this.setDynamicHTMLProp(name, tag, key, value)])
      return this.initStaticHTMLProp(name, tag, key, value)
    }

    return this.setStaticHTMLProp(name, tag, key, value)
  }

  /**
   * insertNode(${dlNodeName}, ${childNodeName}, ${position})
   */
  insertNode(dlNodeName: string, childNodeName: string, position: number) {
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

  // --- Utils
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
}
