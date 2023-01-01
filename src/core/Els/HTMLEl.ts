import { PlainEl } from "./PlainEl";


export class HTMLEl extends PlainEl {
    els = []
    constructor(tag: string) {
        super(document.createElement(tag))
    }
}