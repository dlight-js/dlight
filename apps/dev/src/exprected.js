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
          $n04._$nodes = (() => {
            const $n05 = new $f()
            $n05.nodeFunc = ({ id, label }) => {
              const $n06 = new $h()
              $n06.t("tr")
              $n06.p("className", this.selectIdx === id ? "danger" : "")
              const $n07 = new $h()
              $n07.t("td")
              $n07._$el.className = "col-md-1"
              $n07.p("textContent", id)
              const $n13 = new $h()
              $n13.t("td")
              $n13._$el.className = "col-md-4"
              const $n081 = new $h()
              $n081.t("a")
              $n081._$el.onclick = this.selectRow.bind(this, id)
              // $n081.e("click", this.selectRow.bind(this, id))
              $n081.p("textContent", label)
              $n13._$nodes = [$n081]
              const $n2 = new $h()
              $n2.t("td")
              $n2._$el.className = "col-md-1"
              const $n08 = new $h()
              $n08.t("a")
              $n08._$el.onclick = this.deleteRow.bind(this, id)
              // $n08.e("click", this.deleteRow.bind(this, id))
              const $n09 = new $h()
              $n09.t("span")
              $n09._$el.className = "glyphicon glyphicon-remove"
              $n09._$el.arialHidden = "true"
              $n08._$nodes = [$n09]
              $n2._$nodes = [$n08]
              const $n3 = new $h()
              $n3.t("td")
              $n3._$el.className = "col-md-6"
              $n06._$nodes = [$n07, $n13, $n2, $n3]

              return [$n06]
            }

            $n05.dlScope = this
            $n05.keys = this.rows.map(({ id, label }) => id)
            $n05.array = this.rows

            return [$n05]
          }
          )()
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
      if (changed === 0) {
        $f.keys = this.rows.map(({ id, label }) => id)
        $f.array = this.rows
        $f.updateWithKey()
        for (let i = 0; i < this.rows.length; i += 1) {
          const { id, label } = this.rows[i]
          const nodes = $f._$nodess[i]
          const $n010 = getNode(nodes[0], 1, 0)
          $n010.p("textContent", label)
        }
      }
      if (changed === 1) {
        for (let i = 0; i < this.rows.length; i += 1) {
          const { id, label } = this.rows[i]
          const nodes = $f._$nodess[i]
          const $n0 = nodes[0]
          $n0.p("className", this.selectIdx === id ? "danger" : "")
        }
      }
    }

    return [$n0]
  }

  static $t0 = (() => {
    const t = document.createElement("template")
    t.innerHTML = "<tr><td class=\"col-md-1\"></td><td class=\"col-md-4\"><a></a></td><td class=\"col-md-1\"><a><span aria-hidden=\"true\" class=\"glyphicon glyphicon-remove\"></span></a></td><td class=\"col-md-6\"></td></tr>"
    return t.content.firstChild
  })()
}

function getNode(node, ...path) {
  return path.reduce((node, key) => node._$nodes[key], node)
}
render("main", Main)

// const e = () => {
//   console.log("click")
// }
// const t1 = performance.now()
// for (let i = 0; i < 100000; i++) {
//   const a = new $h()
//   a.t("tr")
//   // a._$el.className = "col-md-1"
//   a.e.onclick = e
//   // a.e("click", e)
// }
// const t2 = performance.now()
// console.log(t2 - t1)
