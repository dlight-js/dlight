const Counter = () => {
  const [count, setCount] = useState(0)
  const countDerived = useMemo(() => (
    timeConsumingFunc(count)
  ), [count])
  const [list, setList] = useState(["0", "1", "2"])

  return (
    <>
      <button
        onClick={() => {
          setCount(prev => prev + 1)
          setList(prev => [...prev, String(prev.length)])
        }}
      >
        +
      </button>
      <div>{count}</div>
      <div>{countDerived}</div>
      {list.map(item => (
        <div 
          className="item"
        >
          {item}
        </div>
      ))}
    </>
  )
}

class Counter extends View {
  count = 0
  countDerived = timeConsumingFunc(this.count)
  list = ["0", "1", "2"]

  Body() {
    button("+")
      .onclick(() => {
        this.count ++
        this.list = [...this.list, String(this.list.length)]
      })
    div(this.count)
    div(this.countDerived)
    for (const item of this.list) {
      div(item)
        .className("item")
    }
  }
}

