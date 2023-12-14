import { HtmlNode as $h, ForNode as $f, View, render, $ } from "@dlightjs/dlight"
let idCounter = 1
const adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"]
const colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"]
const nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"]
function _random(max) {
  return Math.round(Math.random() * 1e3) % max
}
;function buildData(count) {
  const data = new Array(count)
  for (let i = 0; i < count; i++) {
    data[i] = {
      id: idCounter++,
      label: `${adjectives[_random(adjectives.length)]} ${colours[_random(colours.length)]} ${nouns[_random(nouns.length)]}`
    }
  }
  return data
}
class Main extends View {
  _$stateDepArr = ["$selectIdxDeps", "$rowsDeps"]
  _$compName = "Main"
  $rows = []
  $rowsDeps = /* @__PURE__ */
    new Set()

  get rows() {
    return this.$rows
  }

  set rows(value) {
    if (this.$rows === value) {
      return
    }
    this.$rows = value
    this.update(0)
  }

  $selectIdx = -1
  $selectIdxDeps = /* @__PURE__ */
    new Set()

  get selectIdx() {
    return this.$selectIdx
  }

  set selectIdx(value) {
    if (this.$selectIdx === value) {
      return
    }
    this.$selectIdx = value
    this.update(1)
  }

  addRows = function() {
    this.rows = buildData(1e3)
  }
    .bind(this)

  swapRows = function() {
    if (this.rows.length > 998) {
      const tmp = this.rows[1]
      this.rows[1] = this.rows[998]
      this.rows[998] = tmp
      this.rows = [...this.rows]
    }
  }
    .bind(this)

  clearRows = function() {
    this.rows = []
  }
    .bind(this)

  selectRow = function(idx) {
    this.selectIdx = idx
  }
    .bind(this)

  deleteRow = function(id) {
    this.rows = [...this.rows.filter((row) => row.id !== id)]
  }
    .bind(this)

  addBig = function() {
    this.rows = buildData(1e4)
  }
    .bind(this)

  append = function() {
    this.rows = [...this.rows, ...buildData(1e3)]
  }
    .bind(this)

  update = function() {
    for (let i = 0; i < this.rows.length; i += 10) {
      this.rows[i].label += " !!!"
    }
    this.rows = [...this.rows]
  }
    .bind(this)

  Button({ content, id, onclick }) {
    const $n0 = new $h()
    $n0.t("div")
    $n0.p("className", "col-sm-6 smallpad")
    $n0._$nodes = (() => {
      const $n02 = new $h()
      $n02.t("button")
      $n02.p("className", "btn btn-primary btn-block")
      $n02.p("id", id?.[0])
      $n02.e("click", onclick?.[0])
      $n02.p("textContent", content?.[0])
      return [$n02]
    }
    )()
    return [$n0]
  }

  Jumbotron() {
    const $n0 = new $h()
    $n0.t("div")
    $n0.p("className", "jumbotron")
    $n0._$nodes = (() => {
      const $n02 = new $h()
      $n02.t("div")
      $n02.p("className", "row")
      $n02._$nodes = (() => {
        const $n03 = new $h()
        $n03.t("div")
        $n03.p("className", "col-sm-6")
        $n03._$nodes = (() => {
          const $n04 = new $h()
          $n04.t("h1")
          $n04.p("textContent", "DLight.js (keyed)")
          return [$n04]
        }
        )()
        const $n1 = new $h()
        $n1.t("div")
        $n1.p("className", "col-md-6")
        $n1._$nodes = (() => {
          const $n04 = new $h()
          $n04.t("div")
          $n04.p("className", "row")
          $n04._$nodes = (() => {
            const $n05 = this.Button({
              id: ["run"],
              onclick: [this.addRows],
              content: ["Create 1,000 rows"]
            })
            const $n12 = this.Button({
              id: ["runlots"],
              onclick: [this.addBig],
              content: ["Create 10,000 rows"]
            })
            const $n2 = this.Button({
              id: ["add"],
              onclick: [this.append],
              content: ["Append 1,000 rows"]
            })
            const $n3 = this.Button({
              id: ["update"],
              onclick: [this.update],
              content: ["Update every 10th rows"]
            })
            const $n4 = this.Button({
              id: ["clear"],
              onclick: [this.clearRows],
              content: ["Clear"]
            })
            const $n5 = this.Button({
              id: ["swaprows"],
              onclick: [this.swapRows],
              content: ["Swap Rows"]
            })
            return [...$n05, ...$n12, ...$n2, ...$n3, ...$n4, ...$n5]
          }
          )()
          return [$n04]
        }
        )()
        return [$n03, $n1]
      }
      )()
      return [$n02]
    }
    )()

    return [$n0]
  }

  static $t0 = (() => {
    const t = document.createElement("template")
    t.innerHTML = "<tr><td class=\"col-md-1\"></td><td class=\"col-md-4\"><a></a></td><td class=\"col-md-1\"><a><span aria-hidden=\"true\" class=\"glyphicon glyphicon-remove\"></span></a></td><td class=\"col-md-6\"></td></tr>"
    return t.content.firstChild
  })()

  Body() {
    const $n0 = new $h()
    $n0.t("div")
    $n0.p("className", "container")
    $n0._$nodes = (() => {
      const $n02 = this.Jumbotron({})
      const $n1 = new $h()
      $n1.t("div")
      $n1._$nodes = (() => {
        const $n03 = new $h()
        $n03.t("table")
        $n03.p("className", "table table-hover table-striped test-data")
        $n03._$nodes = (() => {
          const $n04 = new $h()
          $n04.t("tbody")
          const $n05 = new $f()
          $n05.nodeFunc = ({ id }) => {
            const $n06 = document.createElement("tr")
            $n06.className = this.selectIdx === id ? "danger" : ""
            const $n07 = document.createElement("td")

            $n07.textContent = id
            $n07.className = "col-md-1"
            $n06.appendChild($n07)

            const $n13 = document.createElement("td")
            $n13.className = "col-md-4"
            const $n081 = document.createElement("a")
            $n081.onclick = this.selectRow.bind(this, id)
            $n13.appendChild($n081)
            $n06.appendChild($n13)

            const $n2 = document.createElement("td")
            $n2.className = "col-md-1"

            const $n08 = document.createElement("a")
            $n08.onclick = this.deleteRow.bind(this, id)
            $n2.appendChild($n08)

            const $n09 = document.createElement("span")
            $n09.className = "glyphicon glyphicon-remove"
            $n09.setAttribute("aria-hidden", "true")

            $n08.appendChild($n09)

            $n06.appendChild($n2)

            const $n3 = document.createElement("td")
            $n3.className = "col-md-6"
            $n06.appendChild($n3)

            const t = new $h()
            t._$el = $n06
            return [t]
          }
          $n05.dlScope = this
          $n05.keys = this.rows.map(({ id, label }) => id)
          $n05.array = this.rows
          $n05.update = (changed) => {
            if (changed === 0) {
              $n05.keys = this.rows.map(({ id, label }) => id)
              $n05.array = this.rows
              $n05.updateWithKey()
              for (let i = 0; i < $n05.array.length; i += 1) {
                const { id, label } = $n05.array[i]
                const nodes = $n05._$nodess[i]
                const $n010 = nodes[0]._$el.childNodes[1].firstChild
                if ($n010.textContent !== label)$n010.textContent = label
              }
            }
            if (changed === 1) {
              for (let i = 0; i < $n05.array.length; i += 1) {
                const { id, label } = $n05.array[i]
                const nodes = $n05._$nodess[i]
                const $n0 = nodes[0]._$el
                const newValue = this.selectIdx === id ? "danger" : ""
                if ($n0.className !== newValue) {
                  $n0.className = newValue
                }
              }
            }
          }

          $n04._$nodes = [$n05]

          return [$n04]
        }
        )()
        const $n12 = new $h()
        $n12.t("span")
        $n12.p("ariaHidden", "true")
        $n12.p("className", "preloadicon glyphicon glyphicon-remove")
        return [$n03, $n12]
      }
      )()
      return [...$n02, $n1]
    }
    )()

    this.update = (changed) => {
      const $f = getNode($n0, 1, 0, 0, 0)
      $f.update(changed)
    }

    return [$n0]
  }
}

function getNode(node, ...path) {
  return path.reduce((node, key) => node._$nodes[key], node)
}
render("main", Main)

// const t1 = performance.now()
// const a = document.createElement("hhh")
// a.appendChild(document.createElement("div"))
// a.appendChild(document.createElement("div"))
// a.appendChild(document.createElement("div"))
// a.appendChild(document.createElement("div"))
// a.appendChild(document.createElement("div"))
// a.appendChild(document.createElement("div"))
// a.appendChild(document.createElement("div"))
// for (let i = 0; i < 100000; i++) {
//   // const c = a.firstChild.nextSibling.nextSibling.nextSibling
//   const c = a.childNodes[3]
// }
// const t2 = performance.now()
// console.log(t2 - t1)
