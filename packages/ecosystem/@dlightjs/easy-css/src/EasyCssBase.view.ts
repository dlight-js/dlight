import DLight, { View } from "@dlightjs/dlight"
import { htmlTag, Prop, required, Static, _, type RequiredProp } from "@dlightjs/types"
import easyCss from "@iandx/easy-css-atomic"

const easyCssKeys = Object.keys(easyCss)

class EasyCssBase extends View {
  @Prop tag: RequiredProp<string> = required
  _$forwardProps = true

  @Static csskeys: string[] = []
  @Static normalKeys: string[] = []

  willMount() {
    const allKeys = [...new Set(
      Object.getOwnPropertyNames(this)
        .filter(m => this[m] === "prop")
        .map(m => m.replace(/^_\$\$\$/, ""))
    )]
    for (const key of allKeys) {
      if (key === "tag") continue
      if (easyCssKeys.includes(key)) {
        this.csskeys.push(key)
      } else {
        this.normalKeys.push(key)
      }
    }
  }

  Body() {
    htmlTag(this.tag)()
      .do(node => {
        node._$addClassName(() => this.csskeys.map(key => (
          easyCss[key](this[key])
        )), this, this.csskeys)
        for (const key of this.normalKeys) {
          node._$addAnyProp(key, () => this[key], this, [key])
        }
      })
    {
      _(this._$children)
    }
  }
}

export default EasyCssBase as any
