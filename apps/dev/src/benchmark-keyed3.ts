import { View, render, HtmlNode as $h, ForNode as $f } from "@dlightjs/dlight"

let idCounter = 1

const adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"]
const colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"]
const nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"]

function _random(max) { return Math.round(Math.random() * 1000) % max };

function buildData(count) {
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
    this.$rowsDeps.forEach((dep) => {
      dep()
    }
    )
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
    this.$selectIdxDeps.forEach((dep) => {
      dep()
    }
    )
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
      $n02.p("id", () => id?.[0], this, [...id?.[1] ?? []])
      $n02.e("click", () => onclick?.[0], this, [...onclick?.[1] ?? []])
      $n02.p("textContent", () => content?.[0], this, [...content?.[1] ?? []])
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
    const $t0 = document.createElement("div")
    ;(() => {
      const $t0 = document.createElement("td")
      $t0.className = "col-md-1"
      const $t1 = document.createElement("td")
      $t1.className = "col-md-4"
      ;(() => {
        const $t0 = document.createElement("a")
        return [$t0]
      })().forEach(t => $t1.appendChild(t))
      const $t2 = document.createElement("td")
      $t2.className = "col-md-1"
      ;(() => {
        const $t0 = document.createElement("a")
        ;(() => {
          const $t0 = document.createElement("span")
          $t0.ariaHidden = "true"
          $t0.className = "glyphicon glyphicon-remove"
          return [$t0]
        })().forEach(t => $t0.appendChild(t))
        return [$t0]
      })().forEach(t => $t2.appendChild(t))
      const $t3 = document.createElement("td")
      $t3.className = "col-md-6"
      return [$t0, $t1, $t2, $t3]
    })().forEach(t => $t0.appendChild(t))
    return $t0
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
          $n04._$nodes = (() => {
            const $n05 = new $f()
            $n05.nodeFunc = ({ id, label }, $i2, $k, $nFor) => {
              const $uf = () => {
                const $v2 = (() => {
                  const { id: id2, label: label2 } = $nFor.i($k, $i2)
                  return {
                    id: id2,
                    label: label2
                  }
                }
                )()
                id = $v2.id
                label = $v2.label
              }

              this._$addDeps(["$rowsDeps"], $uf)
              const $n06 = new $h()
              $n06._$el = Main.$t0.cloneNode(true)
              $n06.dontAppend = true
              $n06.p("className", () => this.selectIdx === id ? "danger" : "", this, ["$selectIdxDeps"])
              $n06._$nodes = (([$t0, $t1, $t2, $t3]) => {
                const $n07 = new $h()
                $n07._$el = $t0
                $n07.dontAppend = true
                $n07.p("textContent", id)
                const $n13 = new $h()
                $n13._$el = $t1
                $n13.dontAppend = true
                $n13._$nodes = (([$t0]) => {
                  const $n08 = new $h()
                  $n08._$el = $t0
                  $n08.dontAppend = true
                  $n08.e("click", this.selectRow.bind(this, id))
                  $n08.p("textContent", () => label, this, ["$rowsDeps"])
                  return [$n08]
                }
                )($n13._$el.childNodes)
                const $n2 = new $h()
                $n2._$el = $t2
                $n2.dontAppend = true
                $n2.p("className", "col-md-1")
                $n2._$nodes = (([$t0]) => {
                  const $n08 = new $h()
                  $n08._$el = $t0
                  $n08.dontAppend = true
                  $n08.e("click", this.deleteRow.bind(this, id))
                  $n08._$nodes = (([$t0]) => {
                    const $n09 = new $h()
                    $n09._$el = $t0
                    $n09.dontAppend = true
                    return [$n09]
                  }
                  )($n08._$el.childNodes)
                  return [$n08]
                }
                )($n2._$el.childNodes)
                const $n3 = new $h()
                $n3._$el = $t3
                $n3.dontAppend = true
                return [$n07, $n13, $n2, $n3]
              }
              )($n06._$el.childNodes)
              this._$addCleanUpDep($uf, Array.isArray($n06) ? $n06[0] : $n06)
              return [$n06]
            }

            $n05.keyFunc = (arr) => {
              return arr.map(({ id, label }) => id)
            }

            $n05.dlScope = this
            $n05.arrayFunc = () => this.rows
            $n05.dependencies = ["$rowsDeps"]
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
    return [$n0]
  }
}

render("main", Main)
