const fs = require('fs')
const readline = require("readline")
const child_process = require("child_process");

let c = child_process; // i did this because its simplerer to use child_process as c
const configExists = fs.existsSync('n.config.json'); // vely impatinet, no no, vely imertont valiable 1 
const nconfig = JSON.parse(fs.readFileSync('n.config.json', 'utf-8')); // vely imertont valiable 2
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

    // initializes realine and store it to rl variable

let ask = (prompt: string): Promise<string> => {
    return new Promise(resolve => rl.question(prompt, (answer: string) => resolve(answer.trim())));
};

module.exports = { nconfig, configExists, c, child_process, ask, rl }
export { nconfig, configExists, c, child_process, ask, rl }