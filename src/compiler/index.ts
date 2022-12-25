import {reconstructBodyStr} from "./generator";

export function view(strArr: TemplateStringsArray) {
    const str = strArr[0]
    return reconstructBodyStr(str)
}