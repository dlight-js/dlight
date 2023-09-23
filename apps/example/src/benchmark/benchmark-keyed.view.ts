import DLight, { View } from "@dlightjs/dlight"
import { SubView, button, div, h1, tr, a, span, table, tbody, td, Prop, required, type Typed } from "@dlightjs/types"

let idCounter = 1

const adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"]
const colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"]
const nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"]

function _random(max: number) { return Math.round(Math.random() * 1000) % max };

function buildData(count: number) {
  const data = new Array(count)
  for (let i = 0; i < count; i++) {
    data[i] = {
      id: idCounter++,
      label: `${adjectives[_random(adjectives.length)]} ${colours[_random(colours.length)]} ${nouns[_random(nouns.length)]}`
    }
  }
  return data
}

class RowClass extends View {
  @Prop id: number = required
  @Prop className: string = required
  @Prop label: string = required
  @Prop selectRow: () = void> = required
  @Prop deleteRow: () = void> = required

  Body() {
    tr()
      .className(this.className)
    {
      td(this.id)
        .className("col-md-1")
      td()
        .className("col-md-4")
      {
        a(this.label)
          .onclick(this.selectRow)
      }
      td()
        .className("col-md-1")
      {
        a()
          .onclick(this.deleteRow)
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

const Row = RowClass as any as Typed<RowClass>

class ButtonClass extends View {
  @Prop _$content: string = required
  @Prop id: string = required
  @Prop onclick: () = void> = required

  Body() {
    div()
      .className("col-sm-6 smallpad")
    {
      button(this._$content)
        .onclick(this.onclick)
        .id(this.id)
        .className("btn btn-primary btn-block")
    }
  }
}

const Button = ButtonClass as any as Typed<ButtonClass>

class App extends View {
  rows: any[] = []
  selectIdx = -1
  addRows() {
    this.rows = buildData(1000)
  }

  swapRows() {
    if (this.rows.length > 999) {
      this.rows = [this.rows[0], this.rows[998], ...this.rows.slice(2, 998), this.rows[1], this.rows[999]]
    }
  }

  clearRows() {
    this.rows = []
  }

  selectRow(idx: number) {
    return () => { this.selectIdx = idx }
  }

  deleteRow(id: number) {
    return () => {
      const idx = this.rows.findIndex(row => row.id === id)
      this.rows = [...this.rows.slice(0, idx), ...this.rows.slice(idx + 1)]
    }
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

  @SubView
  Jumbotron(): any {
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
            .className("row")
          {
            Button("Create 1,000 rows")
              .onclick(this.addRows.bind(this))
              .id("run")
            Button("Create 10,000 rows")
              .onclick(this.addBig.bind(this))
              .id("runlots")
            Button("Append 1,000 rows")
              .onclick(this.append.bind(this))
              .id("add")
            Button("Update every 10th rows")
              .onclick(this.update.bind(this))
              .id("update")
            Button("Clear")
              .onclick(this.clearRows.bind(this))
              .id("clear")
            Button("Swap Rows")
              .onclick(this.swapRows.bind(this))
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
              Row()
                .id(id)
                .label(label)
                .className(this.selectIdx === id ? "danger" : "")
                .selectRow(this.selectRow(id))
                .deleteRow(this.deleteRow(id))
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

export default App
