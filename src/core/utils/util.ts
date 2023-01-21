// ---- 比生成uuid省很多时间（1000个省3ms），但是有可能重复（36^13=1.6^20的概率)，trade off了
export function uid() {
    return Math.random().toString(10).slice(2)
}

