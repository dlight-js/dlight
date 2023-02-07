
export function animatie(func: (percentTime: number) => any, duration: number, callback?: ()=>any) {
    let start: number | undefined, previousTimeStamp: number | undefined
    let done = false
    function step(timestamp: number) {
        if (start === undefined) {
            start = timestamp
        }
        const elapsed = timestamp - start

        if (previousTimeStamp !== timestamp) {
            // ---- 有delay的时候，elapsed比delay小就相当于没开始，percentTime是0
            const percentTime = Math.min(elapsed / (duration * 1000), 1)
            func(percentTime)
            if (percentTime === 1) {
                done = true
            }
        }

        previousTimeStamp = timestamp
        if (!done) {
            requestAnimationFrame(step)
        } else {
            callback && callback()
        }
    }
    requestAnimationFrame(step)
}


