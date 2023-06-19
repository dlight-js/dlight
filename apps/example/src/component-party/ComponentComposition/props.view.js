// ~> App.view.js
import DLight, { View } from "@dlightjs/dlight"
import UserProfile from "./UserProfile"

class App extends View {
  Body() {
    UserProfile()
      .name("John")
      .age(20)
      .favouriteColors(["green", "blue", "red"])
      .isAvailable(true)
  }
}

export default App

// ~> UserProfile.view.js
class UserProfile extends View {
  @Prop name = ""
  @Prop age = null
  @Prop favouriteColors = []
  @Prop isAvailable = false

  Body() {
    p(`My name is ${this.name}!`)
    p(`My age is ${this.age}!`)
    p(`My favourite colors are ${this.favouriteColors.join(", ")}!`)
    p(`I am ${this.isAvailable ? "available" : "not available"}`)
  }
}

export default UserProfile
