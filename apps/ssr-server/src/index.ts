import { render } from "@dlightjs/dlight-server"
import APP from "./test.view"

const app = document.getElementById("app")!
render(app, APP)

console.log(app.innerHTML)
