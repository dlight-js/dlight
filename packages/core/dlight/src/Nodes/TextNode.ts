import { type CustomNode } from "./CustomNode"
import { DLNode, DLNodeType } from "./DLNode"

export class TextNode extends DLNode {
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

  constructor(textOrFunc: string | (() => string), dlScope?: CustomNode, dependencies?: string[]) {
    super(DLNodeType.Text)
    if (!dependencies || !dlScope || dependencies.length === 0) {
      if (dependencies?.length === 0) textOrFunc = (textOrFunc as (() => string))()
      this._$el = document.createTextNode(textOrFunc as string)
      return
    }

    textOrFunc = textOrFunc as (() => string)
    this._$el = document.createTextNode(textOrFunc())
    const updateFunc = this.addTextDep.bind(this, textOrFunc)
    dlScope._$addDeps(dependencies, updateFunc, this)
  }
}
