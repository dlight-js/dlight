import {getPath} from "./utils";

export class Navigator {
    mode: "history" | "hash" = "hash"
    baseUrl: string = ""

    hashTo(url: string) {
        window.location.href = "#" + getPath(url, this.baseUrl)
    }

    historyTo(url: string) {
        window.history.pushState({},"", getPath(url, this.baseUrl))
    }

    to(url: string) {
        if (this.mode === "hash") {
            this.hashTo(url)
            return
        }
        this.historyTo(url)
    }
}

