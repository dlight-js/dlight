import {BodyStringBuilder, newLine} from "./bodyBuilder";
import {ParserEl} from "../parser/parserEl";

export class Generator {
    body: string = ''
    conditions: string[] = []
    conditionValues: string[] = []

    resolveIf(parserEl: ParserEl) {
        const body = new BodyStringBuilder()

        let conditionFunc = newLine(`\tconst el${body.elId(parserEl)} = (() => {`)
        let needReturnNull = true
        for (let idx in parserEl.kv.condition) {
            const condition = parserEl.kv.condition[idx]
            const newBody = new BodyStringBuilder()
            newBody.value += new Generator()
                .resolveSingleParserEl(condition.parserEl)
                .value
            const outerElStr = `el${newBody.elId(condition.parserEl)}`
            if (condition.condition === "true") {
                needReturnNull = false
                conditionFunc += newLine(`\t\treturn ${outerElStr}`);
            } else {
                this.conditionValues.push(condition.condition)
                conditionFunc += newLine(`\t\tif (${condition.condition}) return ${outerElStr}`);
            }
            body.addBody(newBody)
        }
        if (needReturnNull) conditionFunc += newLine(`\t\treturn null`);
        conditionFunc += newLine("\t})()")
        this.conditions.push(conditionFunc)

        return body
    }

    resolveFor(parserEl: ParserEl) {
        const body = new BodyStringBuilder()
        body.add(`const el${body.elId(parserEl)} = []`)
        body.add(`for (${parserEl.kv["forValue"]}) {`)

        const childEl = parserEl.kv["parserEl"]
        body.value += "\t" + new Generator()
            .resolveSingleParserEl(childEl)
            .value
            .replaceAll("\n", "\n\t")
        body.add(`el${body.elId(parserEl)}.push(el${body.elId(childEl)})`)
        body.add('}')

        return body
    }

    resolveSingleParserEl(parserEl: ParserEl) {
        if (parserEl.tag === "If") return this.resolveIf(parserEl)
        if (parserEl.tag === "For") return this.resolveFor(parserEl)

        const body = new BodyStringBuilder()
        body.createEl(parserEl)
        body.addProperties(parserEl)
        for (let childEl of parserEl.children) {
            body.addBody(this.resolveSingleParserEl(childEl))
        }
        body.addChildEl(parserEl, this.conditions, this.conditionValues)

        return body
    }

    generate(parserEl: ParserEl) {
        const body = new BodyStringBuilder()
        let currEl = parserEl.children[0]
        body.addBody(this.resolveSingleParserEl(currEl))
        body.add(`this._$el = el$${currEl.id}`)
        this.body = body.value
    }

}

