import { alterBody } from "./bodyGetter";
import { parseBody } from "./bodyParser";


export default {
    bodyGetter: alterBody,
    bodyParser: parseBody,
} as any