import * as _$ from '@dlightjs/dlight';
// -> ./MyComp.jsd
import { View, render } from "@dlightjs/dlight";

export class MyComp extends View {
  _$derivedPairs = {
    countPlus1: ["count"]
  };
  _$deps = {
    count: new Map(),
    countPlus1: new Map()
  };
  _$tag = "MyComp";
  _$$count = 0;
  get count() {
    return this._$$count;
  }
  set count(value) {
    if (this._$$count === value) return;
    this._$$count = value;
    this._$runDeps("count");
  }
  countPlus1 = () => this.count + 1;
  Body() {
    let _$node0 = new _$.HtmlNode("div")
    _$node0._$addProp('innerText', ()=>this.countPlus1, this, ["count"])
    let _$node1 = new _$.HtmlNode("div")
    _$node1._$addProp('innerText', ()=>this.count, this, ["count"])
    let _$node2 = new _$.HtmlNode("button")
    _$node2._$addProp('innerText', "+")
    _$node2._$addProp("onclick", ()=>{this.count++})
    let _$node3 = new _$.HtmlNode("button")
    _$node3._$addProp('innerText', "-")
    _$node3._$addProp("onclick",()=>{this.count--})
    return [_$node0, _$node1, _$node2, _$node3]
  }
}
