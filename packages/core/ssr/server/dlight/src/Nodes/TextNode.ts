import { type CustomNode } from "./CustomNode"
import { DLNode, DLNodeType } from "./DLNode"

export class TextNode extends DLNode {
  constructor(textOrFunc: string | (() => string), dlScope?: CustomNode, listenDeps?: string[]) {
    super(DLNodeType.Text)
    if (!listenDeps) {
      this._$el = document.createTextNode(textOrFunc as string)
      return
    }

    textOrFunc = textOrFunc as (() => string)
    let prevValue: any = textOrFunc()
    this._$el = document.createTextNode(prevValue)
    const depFunc = () => {
      const newValue = (textOrFunc as (() => string))()
      if (prevValue === newValue) return
      this._$el.nodeValue = newValue
      prevValue = newValue
    }
    dlScope!._$addDeps(listenDeps, depFunc, this)
  }
}
