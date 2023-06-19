// ~> App.view.js
import DLight, { View } from "@dlightjs/dlight"
import fetchUser from "./fetchUser"

class App extends View {
  isLoading
  error
  users

  willMount() {
    fetchUser("users")
  }

  Body() {
    if (this.isLoading) {
      p("Fetching users...")
    } else if (this.error) {
      p("An error occured while fetching users")
    } else if (this.users) {
      ul()
      {
        for (const { name, picture } of this.users) {
          li()
          {
            img()
              .src(picture.thumbnail)
              .alt("user")
            p(`${name.first} ${name.last}`)
          }
        }
      }
    }
  }
}

export default App

// ~> fetchUsers.js
export default async function fetchUsers(dataKey = "data", errorKey = "error", isLoadingKey = "isLoading") {
  this[isLoadingKey] = true
  try {
    const response = await fetch("https://randomuser.me/api/?results=3")
    const { results: users } = await response.json()
    this[dataKey] = users
    this[errorKey] = null
  } catch (err) {
    this[dataKey] = null
    this[errorKey] = err
  }
  this[isLoadingKey] = false
}
