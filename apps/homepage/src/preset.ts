import Markit from "@iandx/markit";
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';


export default function() {
    Markit.addRule.block({
        name: "CodeBlock",
        rule: "default",
        view: (content, {language}) => {
            const highlightedCode = hljs.highlight(content, {language}).value
            return `<div style="background-color: ghostwhite; padding: 25px; border-radius: 5px"><pre><code>${highlightedCode}</code></pre></div>`
        }
    })
}
