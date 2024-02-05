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
  data = {
    obj: { name: "John" },
  }

  myData = new MyData()

  View() {
    div(this.myData.loading)
  }
}
