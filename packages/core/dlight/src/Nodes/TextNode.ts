import { type CustomNode } from "./CustomNode"
import { DLNode, DLNodeType } from "./DLNode"
import { type ValueOrFunc } from "./type"

export class TextNode extends DLNode {
  constructor() {
    super(DLNodeType.Text)
  }

  /**
   * @brief Add text to text node
   * @param valueOrFunc
   * @param dlScope
   * @param dependencies
   * @returns
   */
  t(valueOrFunc: ValueOrFunc, dlScope?: CustomNode, dependencies?: string[]) {
    if (!dependencies || !dlScope || dependencies.length === 0) {
      if (dependencies?.length === 0) valueOrFunc = valueOrFunc()
      this._$el.nodeValue = valueOrFunc
      return
    }
    this._$el.nodeValue = valueOrFunc()
    dlScope._$addDeps(dependencies, this.addTextDep.bind(this, valueOrFunc), this)
  }

  /**
   * @brief Used in addDeps to update text
   * @param textFunc
   * @returns
   */
  addTextDep(textFunc: () => string) {
    const newValue = textFunc()
    // ---- Checking value difference will save 70% time if value is the same
    if (this._$el.nodeValue === newValue) return
    this._$el.nodeValue = newValue
  }
}
