import { View, render, $ } from "@dlightjs/dlight"
import { Prop } from "@dlightjs/dlight-dev"

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
class Row {
  @Prop id
  @Prop label
  @Prop selectIdx
  @Prop selectRow
  @Prop deleteRow

  Body() {
    tr()
      .className(this.selectIdx === this.id ? "danger" : "")
    {
      td(this.id)
        .className("col-md-1")
      td()
        .className("col-md-4")
      {
        a(this.label)
          .onclick($(this.selectRow))
      }
      td()
        .className("col-md-1")
      {
        a()
          .onclick($(this.deleteRow))
        {
          span()
            .className("glyphicon glyphicon-remove")
            .ariaHidden("true")
        }
      }
      td()
        .className("col-md-6")
    }
  }
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
    for (let i = 0; i < this.rows.length; i += 10) {
      this.rows[i].label += " !!!"
    }
    this.rows = [...this.rows]
  }

  @View
  Button({ content, id, onclick }) {
    div()
      .className("col-sm-6 smallpad")
    {
      button(content)
        .onclick(onclick)
        .id(id)
        .className("btn btn-primary btn-block")
    }
  }

  @View
  Jumbotron() {
    div()
      .className("jumbotron")
    {
      div()
        .className("row")
      {
        div()
          .className("col-sm-6")
        {
          h1("DLight.js (keyed)")
        }
        div()
          .className("col-md-6")
        {
          div()
            .className("row"); {
            this.Button("Create 1,000 rows")
              .onclick(this.addRows)
              .id("run")
            this.Button("Create 10,000 rows")
              .onclick(this.addBig)
              .id("runlots")
            this.Button("Append 1,000 rows")
              .onclick(this.append)
              .id("add")
            this.Button("Update every 10th rows")
              .onclick(this.update)
              .id("update")
            this.Button("Clear")
              .onclick(this.clearRows)
              .id("clear")
            this.Button("Swap Rows")
              .onclick(this.swapRows)
              .id("swaprows")
          }
        }
      }
    }
  }

  Body() {
    div()
      .className("container")
    {
      this.Jumbotron()
      div()
      {
        table()
          .className("table table-hover table-striped test-data")
        {
          tbody()
          {
            for (const { id, label } of this.rows) {
              [id]
              Row()
                .id(id)
                .label(label)
                .selectIdx(this.selectIdx)
                .selectRow(this.selectRow.bind(this, id))
                .deleteRow(this.deleteRow.bind(this, id))
            }
          }
        }
        span()
          .className("preloadicon glyphicon glyphicon-remove")
          .ariaHidden("true")
      }
    }
  }
}

render("main", Main)
