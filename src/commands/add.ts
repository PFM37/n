const { nconfig, configExists, c } = require("../global");
const { ask, rl, init } = require("./init");
import * as fs from 'fs';

async function add() {
    if (configExists) {
        return;
    }
    else {
        console.log("Looks like n.config.json doesn't exist")
        const yorn = await ask("Would you like to create it?(y/n): ")
        if (yorn == "y") {
            init()
            return;
        }
        else {
            rl.close()
        }
    }
    const newScript = await ask("what should it be named?: ")
    const newScriptValue = await ask("what should it do?(commands only): ")
    // Use the script name as the file path directly
    const file = JSON.parse(fs.readFileSync(nconfig, "utf-8")).custom[newScript] = newScriptValue
}

module.exports = { add }
export { add }