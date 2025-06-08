const fs = require('fs')
const child_process = require("child_process");

let c = child_process; // i did this because its simplerer to use child_process as c
const configExists = fs.existsSync('n.config.json'); // vely impatinet, no no, vely imertont valiable 1 
const nconfig = JSON.parse(fs.readFileSync('n.config.json', 'utf-8')); // vely imertont valiable 2

module.exports = { nconfig, configExists, c, child_process }
export { nconfig, configExists, c, child_process }