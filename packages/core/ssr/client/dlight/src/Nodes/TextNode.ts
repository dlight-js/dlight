import { type CustomNode } from "./CustomNode"
import { DLNode, DLNodeType } from "./DLNode"

export class TextNode extends DLNode {
  constructor(id: string, el: Node) {
    super(DLNodeType.Text, id)
    this._$el = el
  }

  _$addText(textOrFunc: string | (() => string), dlScope?: CustomNode, listenDeps?: string[]) {
    if (!listenDeps) {
      this._$el.nodeVlaue = textOrFunc
      return
    }

    textOrFunc = textOrFunc as (() => string)
    let prevValue: any
    const depFunc = () => {
      const newValue = (textOrFunc as (() => string))()
      if (prevValue === newValue) return
      this._$el.nodeValue = newValue
      prevValue = newValue
    }
    dlScope!._$addDeps(listenDeps, depFunc, this)
  }
}
