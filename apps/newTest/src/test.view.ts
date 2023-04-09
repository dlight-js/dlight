import {View} from "@dlightjs/dlight";
import {_, button, div, Prop, PropState, required, State, tag, html, h3} from "@dlightjs/types";
import {Await, StateObject, Watch} from "@dlightjs/decorators";
import {css, styled} from "@dlightjs/emotion"
import { HStack } from "@dlightjs/components";

async function sleep(ms: number) {
  return await new Promise(resolve => setTimeout(resolve, ms))
}

async function ok(count) {
  await sleep(1000)
  return count
}
export class TestTest extends View {
  @State count = 0
    @State @Await("jj") hh: number = ok(this.count)
    tt = function() {
      console.log(this.hh, this._$hh)
    }.call(this)
    Body() {
      div(this.hh)
      button()
        .onclick(() => {
          this.count ++
        })
    }
    
}


