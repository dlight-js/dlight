import { PlainEl } from "./PlainEl";


export class HTMLEl extends PlainEl {
    _$els = []
    constructor(tag: string, id: string) {
        super(document.createElement(tag), id)
    }
}