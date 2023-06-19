// ~> App.view.js
import DLight, { View } from "@dlightjs/dlight"

class App extends View {
  user = {
    id: 1,
    username: "unicorn42",
    email: "unicorn42@example.com"
  }

  updateUsername(newUserName) {
    this.user = { ...this.user, userName: newUserName }
  }

  Body() {
    h1(`Welcome back, ${this.user.userName}`)
    env()
      .user(this.user)
      .updateUsername(this.updateUsername.bind(this))
    FunnyButton()
    {
      "Click me!"
    }
  }
}

// ~> UserProfile.view.js
class UserProfile extends View {
  @Env user
  @Env updateUsername

  Body() {
    div()
    {
      h2("My Profile")
      p(`Username: ${this.user.username}`)
      p(`Email: ${this.user.email}`)
      button("Update username to Jane")
        .onclick(() => this.updateUsername("Jane"))
    }
  }
}
