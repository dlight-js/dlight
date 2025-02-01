import { Snippet, feFuncA } from "@dlightjs/dlight"

@Data
class MyData {
  data
  loading = true

  async willMount() {
    this.data = await fetch("hh")
    this.loading = false
  }
}

@View
class App {
  myData = new MyData()

  View() {
    if (this.myData.loading) {
      div("Loading...")
    } else {
      Comp().data(this.myData.data)
    }
  }
}

@Data
class WindowSize {
  width = window.innerWidth
  height = window.innerHeight

  constructor() {
    window.addEventListener("resize", () => {
      this.width = window.innerWidth
      this.height = window.innerHeight
    })
  }
}

@View
class App {
  windowSize = Model(WindowSize, { prop1: 1 })

  windowSize = WindowSize.modeling({ prop1: 1 })

  View() {
    div(`Width: ${this.windowSize.width}, Height: ${this.windowSize.height}`)
  }
}

@View
class jj {
  View() {
    const node = new TryUnit(_$tryNode => {
      try {
        // update =
        // ...
      } catch {
        _$tryNode.shit
        tryNode.caught(
          tryNode.geneNewNodesInEnv(() => {
            // ...
          })
        )
      }
    })
  }
}

import {
  createElement as $$createElement,
  delegateEvent as $$delegateEvent,
  setHTMLProp as $$setHTMLProp,
  render as $$render,
} from "/@fs/Users/duanyihan/Files/GreatProjects/dlight-js/dlight/packages/core/dlight/dist/index.js"
import { View } from "/@fs/Users/duanyihan/Files/GreatProjects/dlight-js/dlight/packages/core/dlight/dist/index.js"
class App extends View {
  _$compName = "App"
  person = {
    name: {
      first: "John",
    },
  }
  $$person = 1
  count = 2
  Body() {
    let $node0, $node1
    this._$update = $changed => {
      if ($changed & 1) {
        $node0 &&
          $$setHTMLProp($node0, "textContent", () => this.person.name.first, [
            this.person.name.first,
          ])
      }
    }
    $node0 = $$createElement("div")
    $$setHTMLProp($node0, "textContent", () => this.person.name.first, [
      this.person.name.first,
    ])
    $node1 = $$createElement("button")
    $$delegateEvent($node1, "click", () => {
      this._$ud((this.person.name.first = "Jane"), "person")
      setcount
      this._$ud((this.person.name.first = "Jane"), "person")
      this._$ud((this.person.name.first = "Jane"), "person")
      this._$ud((this.person.name.first = "Jane"), "person")
    })
    $node1.textContent = "change"
    return [$node0, $node1]
  }
}
$$render("main", App)
export default App

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IjtBQUFBLFNBTUVBLFlBUUs7QUFFUCxNQUVNQyxZQUFHRCxLQUFDO0FBQUEsRUFBQUUsYUFBQTtBQUFBLEVBQ1JDLFNBQVM7QUFBQSxJQUNQQyxNQUFNO0FBQUEsTUFDSkMsT0FBTztBQUFBLElBQ1Q7QUFBQSxFQUNGO0FBQUEsRUFBQ0MsV0FBQTtBQUFBLEVBRURDLE9BQUk7QUFBQSxRQUFBQyxRQUFBQztBQUFBLFNBQUFDLFdBQUFDLGNBQUE7QUFBQSxVQUFBQSxXQUFBO0FBQUFILGtCQUFBSSxjQUFBSixRQUFBLHFCQUNFLEtBQUtMLE9BQU9DLEtBQUtDLE9BQUssQ0FBdEIsS0FBS0YsT0FBT0MsS0FBS0MsS0FBSztBQUFBO0FBQUE7QUFBQUcsYUFBQUssZ0JBQUE7QUFBQUQsa0JBQUFKLFFBQUEscUJBQXRCLEtBQUtMLE9BQU9DLEtBQUtDLE9BQUssQ0FBdEIsS0FBS0YsT0FBT0MsS0FBS0MsS0FBSztBQUFBSSxhQUFBSSxnQkFBQTtBQUFBQyxvQkFBQUwsUUFBQSxTQUNELE1BQU07QUFDN0IsV0FBQU0sS0FBQSxLQUFLWixPQUFPQyxLQUFLQyxRQUFRLFFBQU07QUFBQSxJQUNqQyxDQUFDO0FBQUFJLFdBQUFPLGNBRk07QUFBUSxZQUFBUixRQUFBQyxNQUFBO0FBQUE7QUFJbkI7QUFBQ1EsU0FBQSxRQWJLaEIsR0FBRztBQWVULGVBQWVBIiwibmFtZXMiOlsiVmlldyIsIkFwcCIsIl8kY29tcE5hbWUiLCJwZXJzb24iLCJuYW1lIiwiZmlyc3QiLCIkJHBlcnNvbiIsIkJvZHkiLCIkbm9kZTAiLCIkbm9kZTEiLCJfJHVwZGF0ZSIsIiRjaGFuZ2VkIiwiJCRzZXRIVE1MUHJvcCIsIiQkY3JlYXRlRWxlbWVudCIsIiQkZGVsZWdhdGVFdmVudCIsIl8kdWQiLCJ0ZXh0Q29udGVudCIsIiQkcmVuZGVyIl0sInNvdXJjZXMiOlsiQXBwLnZpZXcudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hpbGRyZW4sXG4gIENvbnRlbnQsXG4gIE1haW4sXG4gIE1vZGVsLFxuICBQcm9wLFxuICBWaWV3LFxuICBXYXRjaCxcbiAgYnV0dG9uLFxuICBkaXYsXG4gIGgxLFxuICBoMixcbiAgaW5wdXQsXG4gIHVzZSxcbn0gZnJvbSBcIkBkbGlnaHRqcy9kbGlnaHRcIlxuXG5AVmlld1xuQE1haW5cbmNsYXNzIEFwcCB7XG4gIHBlcnNvbiA9IHtcbiAgICBuYW1lOiB7XG4gICAgICBmaXJzdDogXCJKb2huXCIsXG4gICAgfSxcbiAgfVxuXG4gIEJvZHkoKSB7XG4gICAgZGl2KHRoaXMucGVyc29uLm5hbWUuZmlyc3QpXG4gICAgYnV0dG9uKFwiY2hhbmdlXCIpLm9uQ2xpY2soKCkgPT4ge1xuICAgICAgdGhpcy5wZXJzb24ubmFtZS5maXJzdCA9IFwiSmFuZVwiXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHBcbiJdLCJmaWxlIjoiL1VzZXJzL2R1YW55aWhhbi9GaWxlcy9HcmVhdFByb2plY3RzL2RsaWdodC1qcy9kbGlnaHQvYXBwcy9kZXYvc3JjL0FwcC52aWV3LnRzIn0=

function useFetch() {}

function changeUser(user, setUser) {
  user.xxx = "new" // won't work
  setUser({ ...user, xxx: "new" }) // will work
}

function MyComp() {
  const user = useFetch()
  changeUser(user)
  changeUser(user, setUser)
  // ->
  this.user = use(useFetch, this, "user")
  this.hello = function () {}
  const person = {
    name: {
      first: "John",
    },
  }
  const $p1 = {
    name: {
      first: "John",
    },
  }
  const { name } = {
    name: {
      first: "John",
    },
  }

  return <div>{$p1.name}</div>
}

function MyComp() {
  this.hello = function () {}
}

class MyComp {
  hello() {}
}

function MyComp() {}
MyComp.hello = function () {}

class MyComp {
  person = {
    name: {
      first: "John",
    },
  }
  @Snippet
  jj() {}
}
