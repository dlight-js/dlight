import {readFile, writeFile} from 'fs'

readFile('./BodyView.ts', 'utf8', (err :any, data:any) => {
    if (err) {
        console.error(err);
        return;
    }
    // const reg = 'Body\\s*?=\\s*?view`([\\s\\S]+?)`';
    // const bodyView = data.match(reg)[0]
    // const View2 = data.match(reg)[1]
    // console.log(bodyView, '分割');
    // console.log(View2);
    // const myRpFunc = function () {
    //     console.log('??')
    // }

    const replace = data.replace(/Body\\s*?=\\s*?view`([\\s\\S]+?)`/g, '$2 $1')
    writeFile('./BodyView.ts', replace, 'utf8', err => {
        console.log(err)
    })
});


