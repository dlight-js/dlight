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

@View
class Main {
  rows = []
  selectIdx = -1

  addRows() {
    this.rows = buildData(1000)
  }

  swapRows() {
    if (this.rows.length > 998) {
      const tmp = this.rows[1]
      this.rows[1] = this.rows[998]
      this.rows[998] = tmp
      this.rows = [...this.rows]
    }
  }

  clearRows() {
    this.rows = []
  }

  selectRow(idx) {
    this.selectIdx = idx
  }

  deleteRow(id) {
    this.rows = [...this.rows.filter(row => row.id !== id)]
  }

  addBig() {
    this.rows = buildData(10000)
  }

  append() {
    this.rows = [...this.rows, ...buildData(1000)]
  }

  update() {
    const newRows = [...this.rows]
    for (let i = 0; i < this.rows.length; i += 10) {
      newRows[i] = { ...newRows[i], label: newRows[i].label + " !!!" }
    }
    this.rows = newRows
  }

  Body() {
    div().class("container"); {
      div().class("jumbotron"); {
        div().class("row"); {
          div().class("col-sm-6"); {
            h1("DLight.js (keyed)")
          }
          div().class("col-md-6"); {
            div().class("row"); {
              div().class("col-sm-6 smallpad"); {
                button("Create 1,000 rows")
                  .onclick(this.addRows)
                  .id("run")
                  .class("btn btn-primary btn-block")
              }
              div().class("col-sm-6 smallpad"); {
                button("Create 10,000 rows")
                  .onclick(this.addBig)
                  .id("runlots")
                  .class("btn btn-primary btn-block")
              }
              div().class("col-sm-6 smallpad"); {
                button("Append 1,000 rows")
                  .onclick(this.append)
                  .id("add")
                  .class("btn btn-primary btn-block")
              }
              div().class("col-sm-6 smallpad"); {
                button("Update every 10th row")
                  .onclick(this.update)
                  .id("update")
                  .class("btn btn-primary btn-block")
              }
              div().class("col-sm-6 smallpad"); {
                button("Clear")
                  .onclick(this.clearRows)
                  .id("clear")
                  .class("btn btn-primary btn-block")
              }
              div().class("col-sm-6 smallpad"); {
                button("Swap Rows")
                  .onclick(this.swapRows)
                  .id("swaprows")
                  .class("btn btn-primary btn-block")
              }
            }
          }
        }
      }
      div(); {
        table().class("table table-hover table-striped test-data"); {
          tbody(); {
            for (const { id, label } of this.rows) {
              key: id

              tr().class(this.selectIdx === id ? "danger" : ""); {
                td(id).class("col-md-1")
                td().class("col-md-4"); {
                  a(label).onclick(this.selectRow.bind(this, id))
                }
                td().class("col-md-1"); {
                  a().onclick(this.deleteRow.bind(this, id)); {
                    span()
                      .class("glyphicon glyphicon-remove")
                      .ariaHidden("true")
                  }
                }
                td().class("col-md-6")
              }
            }
          }
        }
        span()
          .class("preloadicon glyphicon glyphicon-remove")
          .ariaHidden("true")
      }
    }
  }
}

render("main", Main)

const a = document.createElement("div")
const t1 = performance.now()
for (let i = 0; i < 100000; i++) {
  const $update2 = (changed, { id: id2, label: label2 }) => {
    if (changed & 1) {
      setMemorizedProp($n42, "textContent", label2)
    }
    if (changed & 2) {
      setMemorizedProp($n02, "className", this.selectIdx === id2 ? "danger" : "")
    }
  }
  a.update = $update2
}

console.log(performance.now() - t1)