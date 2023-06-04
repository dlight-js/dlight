// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DLight, { View, manual } from "@dlightjs/dlight"
import { button, h4, h3 } from "@dlightjs/types"

function fetchData(loading = "isLoading", data = "myData") {
  this[loading] = true
  setTimeout(() => {
    this[data] = new Date()
    this[loading] = false
  }, 700)
}

class FetchDataView extends View {
  count = 0
  call = manual(() => {
    this.getTime()
  }, [this.count])

  isLoading = false
  myData = new Date()
  getTime = fetchData.bind(this)

  willMount() {
    this.getTime()
  }

  Body() {
    h3("What time is it now")
    button("Get Time")
      .onclick(() => {
        this.count++
      })
    if (this.isLoading) {
      h4("loading....")
    } else {
      h4(String(this.myData))
    }
  }
}

export default FetchDataView
