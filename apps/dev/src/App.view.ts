// @ts-ignore
import { Children, Content, Prop, View, required } from "@dlightjs/dlight"
import { type Typed, type Pretty, button, p, span } from "@dlightjs/types"



const a = Array.from({ length: 10000 }, (_, i) => i+1)
const b = Array.from({ length: 10000 }, (_, i) => i+1)
const t1 = performance.now()

for (const key of a) {
  b.indexOf(key)
}
console.log(performance.now() - t1)


const t2 = performance.now()
const m2 = new Map()
for (const [idx, key] of b.entries()) {
  m2.set(key, idx)
}
for (const key of a) {
  m2.get(key)
}
console.log(performance.now() - t2)



@View
class No {
  @Prop fruit

  willUnmount() {
    console.log("unmount", this.fruit)
  }
  Body() {
    h1(this.fruit)
  }
}
@View
class App {

  fruits = ["apple", "banana", "apple"]

  Body() {
    for (const fruit of this.fruits) {
      button(fruit)
        .onclick(() => {
          console.log(fruit)
          this.fruits = [...this.fruits.slice(1)]
        })
      No().fruit(fruit)
    }
    

  }
}

export default App as Pretty as Typed
