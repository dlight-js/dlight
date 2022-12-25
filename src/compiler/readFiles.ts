import {readFile, writeFile} from 'fs'

// readFile('./BodyView.ts', 'utf8', (err :any, data:any) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     const replace = data.replace(/Body\\s*?=\\s*?view`([\\s\\S]+?)`/g, 'replacement')
//     console.log(replace,'////')
//     // writeFile('./BodyView.ts', replace, 'utf8', err => {
//     //     console.log(err)
//     // })
// });

const bodyViewReg = /Body\s*?=\s*?view\s*?`([\s\S]*?)`/g



readFile('./test.txt', 'utf8', (err :any, data:any) => {
    if (err) {
        console.error(err);
        return;
    }

    const replaceFunc = function (arg:string) {
        let hh = arg.replace(/Body\s*?=\s*?view/g, '')
        return `Body = ${hh}`
    }
    const replace = data.replace(bodyViewReg, replaceFunc)
    writeFile('./test.txt', replace, 'utf8', err => {
        console.log(err)
    })
});

