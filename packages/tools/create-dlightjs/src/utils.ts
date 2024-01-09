export function randomId() {
  return Math.random().toString(32).slice(2, 8)
}

export function success(message: string) {
  console.log(`\x1b[0;32m✔️ ${message}\x1b[0m`)
}

export function fail(message: string) {
  console.log(`\x1b[0;31m❗️ ${message}\x1b[0m`)
}

export function info(message: string) {
  console.log(`\x1b[0;36m${message}\x1b[0m`)
}

export function jsonify(obj: any) {
  return JSON.stringify(obj)
    .replace("{", "{\n    ")
    .replace("}", "\n  }")
    .replace(/,/g, ",\n    ")
}

export const logo = `
     /DDDDDDD  /DD       /DD           /DD         /DD    
    | DD__  DD| DD      |__/          | DD        | DD    
 /:D| DD  \\ DD| DD       /DD  /DDDDDD | DDDDDDD  /DDDDDD  
|__/| DD  | DD| DD      | DD /DD__  DD| DD__  DD|_  DD_/  
    | DD  | DD| DD      | DD| DD  \\ DD| DD  \\ DD  | DD    
 /:D| DD  | DD| DD      | DD| DD  | DD| DD  | DD  | DD /DD
|__/| DDDDDDD/| DDDDDDDD| DD|  DDDDDDD| DD  | DD  |  DDDD/
    |_______/ |________/|__/ \\____  DD|__/  |__/   \\___/  
                             /DD  \\ DD                    
                            |  DDDDDD/                    
                             \\______/                                               
`
