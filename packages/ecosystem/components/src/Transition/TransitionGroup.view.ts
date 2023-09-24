import { Children, type DLNode, Prop, Static, View, required } from "@dlightjs/dlight"
import { type Typed, _, type Pretty } from "@dlightjs/types"

type TransitionPropSub<T> = T | ((el: HTMLElement) => T)
type Timing = "appear" | "firstAppear" | "move" | "disappear" | "lastDisappear"
type TransitionProp<T> = TransitionPropSub<T> | ({
  [key in Timing]?: TransitionPropSub<T>
})
type StyleWith = string | Record<string, any>

interface RemoveStore {
  parentNode: ParentNode
  el: HTMLElement
  rect: { top: number, left: number }
  idx: number
}

interface TransitionGroupProps {
  duration?: TransitionProp<number>
  easing?: TransitionProp<string>
  delay?: TransitionProp<number>
  appearWith?: StyleWith | ((el: HTMLElement) => StyleWith)
  disappearWith?: StyleWith | ((el: HTMLElement) => StyleWith)
  movable?: boolean
}

@View
class TransitionGroup implements TransitionGroupProps {
  @Children children: DLNode[] = required
  @Static _$duration = 0.5
  @Static _$easing = "ease-in-out"
  @Static _$delay = 0
  @Prop duration = this._$duration
  @Prop easing = this._$easing
  // 这里的delay在新建会先把下面的push下去，等delay时间到了再出现，这其实是符合预期的，因为不然你setTimeOut控制它出现
  @Prop delay = this._$delay

  parseProp(el: HTMLElement, key: "duration" | "easing" | "delay") {
    const prop: any = {}
    const defaultValue = this[`_$${key}`]
    const value = this[key] as any
    if (typeof value === "object") {
      prop.appear = value.appear ?? defaultValue
      prop.firstAppear = value.firstAppear ?? prop.appear
      prop.disappear = value.disappear ?? defaultValue
      prop.lastDisappear = value.lastDisappear ?? prop.disappear
      prop.move = value.move ?? defaultValue
    } else {
      prop.firstAppear = value
      prop.appear = value
      prop.disappear = value
      prop.lastDisappear = value
      prop.move = value
    }
    const toValue = (prop: any) => (typeof prop === "function") ? prop(el) : prop

    prop.appear = toValue(prop.appear) ?? defaultValue
    prop.firstAppear = toValue(prop.firstAppear) ?? prop.appear
    prop.disappear = toValue(prop.disappear) ?? defaultValue
    prop.lastDisappear = toValue(prop.lastDisappear) ?? prop.disappear
    prop.move = toValue(prop.move) ?? defaultValue

    return prop
  }

  _duration = (el: HTMLElement) => this.parseProp(el, "duration")
  _easing = (el: HTMLElement) => this.parseProp(el, "easing")
  _delay = (el: HTMLElement) => this.parseProp(el, "delay")

  @Static firstRender = true

  transition = (el: HTMLElement, timing: Timing) => (
        `all ${this._duration(el)[timing]}s ${this._easing(el)[timing]} ${this._delay(el)[timing]}s`
  )

  @Prop appearWith = { opacity: 0 }
  @Prop disappearWith = { opacity: 0 }
  @Prop movable = true

  resolveDisappear(removeStore: RemoveStore) {
    const { el, parentNode, rect, idx } = removeStore
    el.style.position = "absolute"
    el.style.transition = this.lastDisappear
      ? this.transition(el, "lastDisappear")
      : this.transition(el, "disappear")
    el.style.margin = ""
    el.style.transform = ""
    loopEls(el, (e) => {
      e.style.margin = ""
      e.style.transform = ""
    })
    el.style.top = `${rect.top}px`
    el.style.left = `${rect.left}px`
    if (parentNode.childNodes.length >= idx) {
      parentNode.appendChild(el)
    } else {
      parentNode.insertBefore(el, parentNode.childNodes[idx])
    }

    requestAnimationFrame(() => {
      const listener = () => {
        el.removeEventListener("transitionend", listener)
        el.remove()
      }
      el.addEventListener("transitionend", listener)
      changeElStyle(el, this.disappearWith)
    })
  }

  @Static prevElInfos = new Map()
  @Static removeStore?: RemoveStore
  @Static lastDisappear = false
  @Static removeStores?: RemoveStore[]

  // ---- 最后一次消失
  willUnmount() {
    this.lastDisappear = true
    const els = (this as any)._$el
    this.removeStores = []
    for (const el of els) {
      this.removeStores.push(setRemoveStore(el))
    }
  }

  didUnmount() {
    for (const removeStore of this.removeStores!) {
      this.resolveDisappear(removeStore)
    }
  }

  Body() {
    _(this.children)
      .onUpdateNodes(() => {
        for (const [el, prevElInfo] of this.prevElInfos.entries()) {
          if (this.movable) {
            // ---- 不管怎么样先停transform
            el.style.transform = ""
            // ---- 如果上次还在add中，这里的prevElInfo.stopTrigger就是true
            //      此时不进行update的移动
            const currElInfo = {
              rect: el.getBoundingClientRect(),
              stopTrigger: prevElInfo.stopTrigger
            }
            this.prevElInfos.set(el, currElInfo)
            if (currElInfo.stopTrigger) continue
            // ---* 原来有，就移动。逻辑非常非常绕
            // ---- 让上一次如果没有进行完的动画提前停止
            prevElInfo.stopTrigger = true
            // ---- 由于prevEl.rect的位置一直在更新，
            //      最终的结果就是element已经在当前位置，
            //      transform从目标位置到当前位置，所以是 prev - curr
            const moveX = prevElInfo.rect.x - currElInfo.rect.x
            const moveY = prevElInfo.rect.y - currElInfo.rect.y
            moveElement(el,
              this._duration(el).move, this._easing(el).move, this._delay(el).move,
              moveX, moveY, currElInfo)
          }
        }
      })
      .didAppear((el: any) => {
        el.style.transition = this.firstRender
          ? this.transition(el, "firstAppear")
          : this.transition(el, "appear")
        loopEls(el, (e) => {
          e.style.transition = this.firstRender
            ? this.transition(e, "firstAppear")
            : this.transition(e, "appear")
        })
        requestAnimationFrame(() => {
          // ---- 刚进来先设置成true，只有可以避免进来就再次移动
          this.prevElInfos.set(el, {
            rect: el.getBoundingClientRect(),
            stopTrigger: true
          })
        })
        if (!this.appearWith) return
        const prevStyle = el.style.cssText
        changeElStyle(el, this.appearWith)

        const firstRender = this.firstRender
        requestAnimationFrame(() => {
          el.setAttribute("style", prevStyle)
          const listener = () => {
            const elInfo = this.prevElInfos.get(el)
            elInfo.rect = el.getBoundingClientRect()
            elInfo.stopTrigger = false
            el.removeEventListener("transitionend", listener)
          }
          el.addEventListener("transitionend", listener)
          // ---- 在这里设置firstRender因为是在一轮微任务后面，初始的已经全部加载完了
          if (this.firstRender) this.firstRender = false
          setTimeout(() => {
            // ---- 为了保护transitionend被打断，触发不了导致stopTrigger永远为true
            this.prevElInfos.get(el).stopTrigger = false
          }, this._duration(el).appear * 1000)
          if (firstRender) {
            // ---- 这是对于firstRender而言的，重新设置transition
            requestAnimationFrame(() => {
              el.style.transition = this.transition(el, "appear")
            })
          }
        })
      })
      .willDisappear((el: any) => {
        if (this.lastDisappear) return
        this.removeStore = setRemoveStore(el)
        this.prevElInfos.delete(el)
      })
      .didDisappear(() => {
        if (this.lastDisappear) return
        this.resolveDisappear(this.removeStore!)
      })
  }
}

function setRemoveStore(el: HTMLElement): RemoveStore {
  return ({
    el: el.cloneNode(true) as HTMLElement,
    parentNode: el.parentNode!,
    rect: { top: el.offsetTop, left: el.offsetLeft },
    idx: Array.from(el.parentNode?.childNodes ?? []).indexOf(el)
  })
}

function loopEls(el: HTMLElement, func: (el: HTMLElement) => any) {
  if (el.nodeType === Node.TEXT_NODE) return
  func(el)
  el.childNodes.forEach(e => loopEls(e as HTMLElement, func))
}

function changeElStyle(el: HTMLElement, styleWith: StyleWith | ((el: HTMLElement) => StyleWith)) {
  if (typeof styleWith === "function") styleWith = styleWith(el)
  const prevStyle = el.style.cssText
  if (typeof styleWith === "string") {
    el.setAttribute("style", prevStyle + styleWith)
  } else {
    for (const [key, value] of Object.entries(styleWith)) {
      el.style[key as any] = value
    }
  }
}

// TODO! 这里requestAnimationFrame会中断transition
// ---- 太牛逼了
function moveElement(element: HTMLElement, duration: number, easing: string, delay: number, moveX: number, moveY: number, currEl: { rect: any, stopTrigger: boolean }) {
  let start: number | undefined, previousTimeStamp: number | undefined
  let done = false
  const transition = `all ${duration}s ${easing} ${delay}s`
  function step(timestamp: number) {
    if (start === undefined) {
      start = timestamp
      element.style.transition = transition + ", transform 0s"
    }
    const elapsed = timestamp - start

    if (previousTimeStamp !== timestamp) {
      // ---- 有delay的时候，elapsed比delay小就相当于没开始，percentTime是0
      const percentTime = Math.max(elapsed / (duration * 1000) - delay, 0)

      const goX = percentTime * moveX
      const goY = percentTime * moveY

      if (percentTime >= 1) {
        element.style.transform = ""
        done = true
      } else {
        element.style.transform = `translate(${moveX - goX}px, ${moveY - goY}px)`
      }
      // ---- 实时更新现在的位置
      currEl.rect = element.getBoundingClientRect()
    }

    previousTimeStamp = timestamp
    // ---- 正常结束 或者 让上一次如果没有进行完的动画提前停止
    if (!done && !currEl.stopTrigger) {
      requestAnimationFrame(step)
    } else {
      element.style.transition = transition
    }
  }
  requestAnimationFrame(step)
}

export default TransitionGroup as Pretty as Typed<TransitionGroup>
