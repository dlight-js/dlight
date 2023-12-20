


function $H(tagName) {
  return document.createElement(tagName)
}

function $e(element, eventName, callback) {
  element.addEventListener(eventName, callback)
}


@View
class Main {
  View() {
    div(this.count)
      .hh(View => {

      })
      .onClick(() => {
        this.count ++
      })
      .className("ok")
    div(); {
      span("what is this")
    }
  }
}

class Main extends View {

  static $t1 = $t(`<div class="ok"></div>`)
  static $t2 = $t(`<div><span>what is this</span></div>`)

  View() {
    const $0 = Main.$t1.cloneNode(true)
    $0.onclick = () => {
      this.count ++
    }
    $0.textContent = this.count

    const $1 = Main.$t2.cloneNode(true)

    this._$nodes = [$0, $1]

    this._$update = (changed) => {
      if (changed & 0x1) {
        $0.textContent = this.count
      }
    }
  }
}

@View
class Main {
  View() {
    div(this.count)
      .className("ok")
    div(); {
      span("what is this")
      for (const i of this.arr) {
        span(`This is ${i}`)
      }
    }
  }
}

class Main extends View {
  static $t1 = $t(`<div class="hhh"></div>`)
  static $t2 = $t(`<div><span>what is this</span></div>`)
  static $t3 = $t(`<span></span>`)

  View() {
    const $0 = Main.$t1.cloneNode(true)
    $0.textContent = this.count
    const $1 = Main.$t2.cloneNode(true)
    const $1_1 = $f(() => {
      for (const i of this.arr) {
        const $0 = Main.$t3.cloneNode(true)
        $0.textContent = `This is ${i}`
        return [$0]
      }
    }) 
    $1._$nodes = Array.from($1.childNodes)
    $1._$nodes.splice(1, 0, $1_1)


    this._$nodes = [$0, $1]
  }
}