import { parseBody } from "./bodyParser";
import { alterBody } from "./bodyGetter";


export default {
    bodyGetter: alterBody,
    bodyParser: parseBody
} as any